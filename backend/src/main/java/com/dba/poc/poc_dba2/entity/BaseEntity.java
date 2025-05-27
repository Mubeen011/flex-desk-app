package com.dba.poc.poc_dba2.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {

    @CreatedDate
    @Column(updatable = false)
    public LocalDateTime createdAt;

    @CreatedBy
    @Column(updatable = false)
    public String createdBy;

    @LastModifiedDate
    @Column(insertable = false)
    public LocalDateTime updatedAt;

    @LastModifiedBy
    @Column(insertable = false)
    public String updatedBy;
}
