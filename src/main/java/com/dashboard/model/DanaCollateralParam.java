package com.dashboard.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DanaCollateralParam {
    private String bank;
    private String date1;
    private String date2;
}
