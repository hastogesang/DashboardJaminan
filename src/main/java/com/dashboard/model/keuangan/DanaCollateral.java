package com.dashboard.model.keuangan;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
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
@Table(name = "DanaCollateral")
public class DanaCollateral extends Common implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy", locale = "id", timezone = "Asia/Jakarta")
    @Column(name = "businessdate", nullable = true)
    private Date businessdate;

    @Column(name = "code", length = 3, nullable = true)
    private String code;

    @OneToMany(targetEntity = AnggotaKliring.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "code", referencedColumnName = "code")
    private List<AnggotaKliring> anggotaKliring;

    @Column(name = "bank", length = 20, nullable = true)
    private String bank;
    
    @Column(name = "nominal", nullable = true)
    private BigDecimal nominal;
    
    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy", locale = "id", timezone = "Asia/Jakarta")
    @Column(name = "tanggalpenempatan", nullable = true)
    private Date tanggalpenempatan;

    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy", locale = "id", timezone = "Asia/Jakarta")
    @Column(name = "jatuhtempo", nullable = true)
    private Date jatuhtempo;

    @Column(name = "jangkawaktu", nullable = true)
    private Integer jangkawaktu;

    @Column(name = "sukubunga", nullable = true)
    private BigDecimal sukubunga;

    @Column(name = "bungabruto", nullable = true)
    private BigDecimal bungabruto;

    @Column(name = "pph", nullable = true)
    private BigDecimal pph;

    @Column(name = "adjustment", nullable = true)
    private BigDecimal adjustment;

    @Column(name = "bunganetto", nullable = true)
    private BigDecimal bunganetto;

    @Column(name = "bungatransfer", nullable = true)
    private BigDecimal bungatransfer;

    @Column(name = "penempatan", nullable = true)
    private BigDecimal penempatan;

    @Column(name = "aro", length = 1, nullable = true)
    private String aro;

    @Column(name = "multiple", length = 1, nullable = true)
    private String multiple;

    @Column(name = "sequence", nullable = true)
    private Integer sequence;

    @Column(name = "flag", length = 1, nullable = true)
    private String flag;

    @Column(name = "admin", nullable = true)
    private BigDecimal admin;

    @Column(name = "flag_bunga", length = 1, nullable = true)
    private String flag_bunga;
}