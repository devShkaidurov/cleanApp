package com.study.cleanApp.dto;

import java.util.ArrayList;
import java.util.List;

import com.study.cleanApp.models.Cleaner;

import lombok.Data;
import org.springframework.jdbc.core.RowMapper;

@Data
public class CleanerAdminDTO {
    private long id;
    private String fio;
    private long countOrders;
    private double avgReview;
    private long salary;

    public static CleanerAdminDTO fromEntity (Cleaner cleaner) {
        CleanerAdminDTO dto = new CleanerAdminDTO();
        dto.setId(cleaner.getId());
        dto.setFio(cleaner.getFio());
        return dto;
    }

    public static Cleaner toEntity (CleanerAdminDTO dto) {
        Cleaner cleaner = new Cleaner();
        cleaner.setId(dto.getId());
        cleaner.setFio(dto.getFio());
        return cleaner;
    }

    public static RowMapper<CleanerAdminDTO>cleanerMapper = (rs, rowNum) -> {
        CleanerAdminDTO dto = new CleanerAdminDTO();
        dto.setFio(rs.getString("fio"));
        dto.setCountOrders(rs.getLong("countOrders"));
        dto.setSalary(rs.getLong("salary"));
        dto.setAvgReview(rs.getDouble("avgReview"));
        dto.setId(rs.getLong("id"));
        dto.setAvgReview(dto.getAvgReview());
        String atr = "sdasdsa";
        atr.
        return dto;
    };

}
