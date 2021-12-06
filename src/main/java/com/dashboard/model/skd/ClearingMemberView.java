package com.dashboard.model.skd;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class ClearingMemberView {
    @Id
    @Column(name = "CMID")
    private Integer cmid;
    @Column(name = "Code")
    private String code;
    @Column(name = "Name")
    private String name;
    @Column(name = "cmType")
    private String type;
}
