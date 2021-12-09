package com.dashboard.model.keuangan;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "User_Role")
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    public User user;

    @Column(name = "user_id", nullable = true)
    private Integer userId;

    @ManyToOne
    @JoinColumn(name = "role_id", insertable = false, updatable = false)
    public Role role;

    @Column(name = "role_id", nullable = true)
    private Integer roleId;
}
