package com.dashboard.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "AnggotaKliring")
public class AnggotaKliring {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "code", length = 4, nullable = true)
    private String code;

    @Column(name = "name", length = 200, nullable = true)
    private String name;
    
    @Column(name = "address", length = 2000, nullable = true)
    private String address;

    @Column(name = "type", length = 1, nullable = true)
    private String type;
}
