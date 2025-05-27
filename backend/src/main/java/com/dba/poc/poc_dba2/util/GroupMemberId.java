package com.dba.poc.poc_dba2.util;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class GroupMemberId implements Serializable {
    private int groupId;
    private int userId;

}
