package com.dashboard.model.keuangan;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Where;

import lombok.Data;

@Data
@Entity
@Table(name = "Menu")
@Where(clause = "deleted = 'false'")
public class Menu extends Common{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id")
    private Integer id;

    @Column(name = "menu_name")
    private String menu_name;

    @Column(name = "url")
    private String url;

    @Column(name = "keterangan")
    private String keterangan;

}
