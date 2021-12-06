package com.dashboard.model;

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
@Table(name = "Menu_Role")
public class MenuRole extends Common {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "menu_id", insertable = false, updatable = false)
    public Menu menu;

    @Column(name = "menu_id", nullable = true)
    private Integer menuId;

    @ManyToOne
    @JoinColumn(name = "role_id", insertable = false, updatable = false)
    public Role role;

    @Column(name = "role_id", nullable = true)
    private Integer roleId;


}
