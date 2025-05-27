package com.dba.poc.poc_dba2.rest;

import com.dba.poc.poc_dba2.repository.UserRepository;
import com.dba.poc.poc_dba2.service.SSOAuthService;
import com.dba.poc.poc_dba2.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping(path = "/flexdesk")
@CrossOrigin(origins = "*")
public class SSOAuthController {
    @Autowired
    SSOAuthService ssoAuthService;

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

    //  String redirectUri2 = "http://localhost:8080/api/auth/sso/fetchTokens?code=";
    @RequestMapping("/login")
    public String login() {
//        String ssoRedirectUrl = "";
        return ssoAuthService.loginService();
    }


    @RequestMapping("/fetchTokens")
    public ResponseEntity<?> fetchTokens(@RequestParam("code") String authorizationCode) {
        return ssoAuthService.fetchTokensService(authorizationCode);
    }
}
