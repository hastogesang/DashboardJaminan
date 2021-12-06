package com.dashboard.model.keuangan;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

// import org.hibernate.annotations.Immutable;
import lombok.Data;

@Entity
@Data
// @Immutable
@Table(name = "GetDanaJaminanView")
public class GetDanaJaminanView {

    @Id
    @Column
    Integer id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy", locale = "id", timezone = "Asia/Jakarta")
    @Temporal(TemporalType.DATE)
    @Column
    Date businessdate;

    @Column
    String code;

    @Column
    String bank;

    @Column
    BigDecimal jumlah;

    @Column
    Integer jangkawaktu;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy", locale = "id", timezone = "Asia/Jakarta")
    @Temporal(TemporalType.DATE)
    @Column
    Date tanggalpenempatan;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy", locale = "id", timezone = "Asia/Jakarta")
    @Temporal(TemporalType.DATE)
    @Column
    Date jatuhtempo;

    @Column
    BigDecimal sukubunga;

    @Column
    BigDecimal bungabruto;

    @Column
    BigDecimal pph;

    @Column
    BigDecimal bunga;

    @Column
    BigDecimal adjustment;
    
    @Column
    BigDecimal admin;
    
    @Column
    BigDecimal transferdana;
    
    @Column
    BigDecimal transferdanakbi;
    
    @Column
    BigDecimal penempatan;
    
    @Column
    String aro;
   
    @Column
    String multiple;
    
    @Column
    Integer sequence;
    
    @Column
    String flag;
    
    @Column
    String flag_bunga;

    @Column
    String name;

    @Column
    String address;
    
}
