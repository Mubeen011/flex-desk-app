package com.dba.poc.poc_dba2.audit;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component("auditAwareImpl")

public class AuditAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // If authentication is null or not authenticated, return default auditor
        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.of("SYSTEM"); // Default auditor for unauthenticated scenarios
        }

        return Optional.of(authentication.getName());
    }
}
