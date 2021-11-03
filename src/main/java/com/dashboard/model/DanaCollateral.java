package com.dashboard.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
public class DanaCollateral {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", locale = "id", timezone = "Asia/Jakarta")
    @Column(name = "businessDate")
    private Date businessDate;

    @Column(name = "code")
    private String code;

    @Column(name = "bank")
    private String bank;

    @Column(name = "nominal")
    private Double nominal;

    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", locale = "id", timezone = "Asia/Jakarta")
    @Column(name = "tanggalPenempatan")
    private Date tanggalPenempatan;

    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", locale = "id", timezone = "Asia/Jakarta")
    @Column(name = "jatuhTempo")
    private Date jatuhTempo;

    @Column(name = "sukuBunga")
    private Double sukuBunga;

    @Column(name = "penempatanBaru")
    private String penempatanBaru;

    @Column(name = "adjustmentBunga")
    private Double adjustmentBunga;
    
    @Column(name = "bungaSetelahAdjustment")
    private Double bungaSetelahAdjustment;

    @Column(name = "aro")
    private boolean aro;

    @Column(name = "multiple")
    private boolean multiple;

    @Column(name = "sequence")
    private String sequence;
}
