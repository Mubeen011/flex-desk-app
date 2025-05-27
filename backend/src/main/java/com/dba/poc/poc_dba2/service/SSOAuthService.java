package com.dba.poc.poc_dba2.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.dba.poc.poc_dba2.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.Map;

@Service
@Slf4j
public class SSOAuthService {
    @Value("${aws.cognito.client-id}")
    private String clientId;

    @Value("${aws.cognito.redirect-uri}")
    private String redirectUri;

    @Value("${aws.cognito.sso-url}")
    private String ssoUrl;

    @Value("${aws.cognito.identity-provider}")
    private String identityProvider;

    @Value("${aws.cognito.scope}")
    private String scope;

    @Value("${aws.cognito.token-url}")
    private String tokenUrl;

    @Value("${aws.cognito.client-secret}")
    private String clientSecret;

    @Value("${aws.cognito.cognito-domain}")
    private String cognitoDomain;

    @Autowired
    UserService userService;

    public String loginService() {
        String ssoRedirectUrl = ssoUrl
                + "?identity_provider=" + identityProvider
                + "&redirect_uri=" + redirectUri
                + "&response_type=CODE"
                + "&client_id=" + clientId
                + "&scope=" + scope;

        return ssoRedirectUrl;
    }

    public static String extractEmail(String jwtToken) {
        try {
            DecodedJWT decodedJWT = JWT.decode(jwtToken);
            return decodedJWT.getClaim("email").asString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String extractFirstName(String jwtToken) {
        try {
            DecodedJWT decodedJWT = JWT.decode(jwtToken);
            return decodedJWT.getClaim("given_name").asString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String extractLastName(String jwtToken) {
        try {
            DecodedJWT decodedJWT = JWT.decode(jwtToken);
            return decodedJWT.getClaim("family_name").asString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public ResponseEntity<?> fetchTokensService( String authorizationCode) {
        try {

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            String authHeader = Base64.getEncoder().encodeToString((clientId + ":" + clientSecret).getBytes());
            headers.set("Authorization", "Basic " + authHeader);

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("grant_type", "authorization_code");
            body.add("code", authorizationCode);
            //  redirectUri2+=authorizationCode;
            body.add("redirect_uri", redirectUri);
            body.add("client_id", clientId);
//            body.add("client_secret", clientSecret);
            log.info(body.toString());

            HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);
            log.info(requestEntity.toString());
            ResponseEntity<Map> response = restTemplate.exchange(
                    tokenUrl,
                    HttpMethod.POST,
                    requestEntity,
                    Map.class
            );
            log.info(response.getBody().toString());
            Map<String, Object> responseBody = response.getBody();
            if (responseBody == null || !responseBody.containsKey("access_token")) {
                throw new Exception("Failed to fetch tokens from response");
            }

            String idToken = (String) responseBody.get("id_token");
            String accessToken = (String) responseBody.get("access_token");
            String refreshToken = (String) responseBody.get("refresh_token");

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("id_token", idToken);
            responseHeaders.set("access_token", accessToken);
            responseHeaders.set("refresh_token", refreshToken);

            String email = extractEmail(idToken);
            String firstName = extractFirstName(idToken);
            String lastName = extractLastName(idToken);
            System.out.println("Creds from JWT: " + email + ", " + firstName+  ", " + lastName);
            User user = userService.userRepository.findByEmail(email);

           String loginType = userService.toggleLoginType(email);

            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body(Map.of(
                            "id_token", idToken,
                            "access_token", accessToken,
                            "refresh_token", refreshToken,
                            "login_type", loginType,
                            "email", email,
                            "first_name", firstName,
                            "last_name", lastName
                    ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch tokens", "message", e.getMessage()));
        }
    }
}
