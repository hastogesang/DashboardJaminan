package com.dashboard.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "DanaJaminan")
public class DanaJaminan implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
    @Temporal(TemporalType.DATE)
    @Column(name = "businessdate")
    private Date businessdate;

    @OneToMany(targetEntity = AnggotaKliring.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "code", referencedColumnName = "code")
    private List<AnggotaKliring> anggotaKliring;

    @Column(name = "code", length = 4)
    private String code;

    @Column(name = "bank", length = 20)
    private String bank;

    @Column(name = "jumlah")
    private BigDecimal jumlah;

    @Column(name = "jangkawaktu")
    private Integer jangkawaktu;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
    @Temporal(TemporalType.DATE)
    @Column(name = "tanggalpenempatan")
    private Date tanggalpenempatan;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
    @Temporal(TemporalType.DATE)
    @Column(name = "jatuhtempo")
    private Date jatuhtempo;

    @Column(name = "sukubunga")
    private BigDecimal sukubunga;

    @Column(name = "bungabruto")
    private BigDecimal bungabruto;

    @Column(name = "pph")
    private BigDecimal pph;

    @Column(name = "bunga")
    private BigDecimal bunga;

    @Column(name = "adjustment")
    private BigDecimal adjustment;

    @Column(name = "admin")
    private BigDecimal admin;

    @Column(name = "transferdana")
    private BigDecimal transferdana;

    @Column(name = "transferdanakbi")
    private BigDecimal transferdanakbi;

    @Column(name = "penempatan")
    private BigDecimal penempatan;

    @Column(name = "aro", length = 1)
    private String aro;

    @Column(name = "multiple", length = 1)
    private String multiple;

    @Column(name = "sequence")
    private Integer sequence;

    @Column(name = "flag", length = 1)
    private String flag;

}
