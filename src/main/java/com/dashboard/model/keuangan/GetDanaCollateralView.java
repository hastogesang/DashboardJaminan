package com.dashboard.model.keuangan;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Entity
@Data
public class GetDanaCollateralView {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "code", length = 3)
    private String code;

    @Column(name = "bank", length = 20)
    private String bank;
    
    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy", locale = "id", timezone = "Asia/Jakarta")
    @Column(name = "tanggalpenempatan")
    private Date tanggalpenempatan;
    
    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy", locale = "id", timezone = "Asia/Jakarta")
    @Column(name = "jatuhtempo")
    private Date jatuhtempo;
    
    @Column(name = "jumlah")
    private BigDecimal nominal;

    @Column(name = "sukubunga")
    private BigDecimal sukubunga;

    @Column(name = "bungabruto")
    private BigDecimal bungabruto;

    @Column(name = "pph")
    private BigDecimal pph;

    @Column(name = "adjustment")
    private BigDecimal adjustment;
    
    @Column(name = "transferdana")
    private BigDecimal bungatransfer;
    
    @Column(name = "penempatan")
    private BigDecimal penempatan;
    
    @Column(name = "aro", length = 1)
    private String aro;

    @Column(name = "multiple", length = 1)
    private String multiple;

    @Column(name = "sequence")
    private Integer sequence;

    @Column(name = "admin")
    private BigDecimal admin;

    @Column(name = "flag", length = 1)
    private String flag;

    @Column(name = "flag_bunga", length = 1)
    private String flag_bunga;
    
    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;
}
