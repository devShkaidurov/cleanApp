package com.study.cleanApp.dto;

import java.util.Date;
import java.util.List;

import com.study.cleanApp.models.Cleaner;
import com.study.cleanApp.models.Order;

import lombok.Data;

@Data
public class CleanerDTO {
    private long id;
    private String login;
    private String fio;
    private Date birthdate;
    private List<Order> orders;

    public static CleanerDTO fromEntity (Cleaner cleaner) {
        CleanerDTO dto = new CleanerDTO();
        dto.setId(cleaner.getId());
        dto.setLogin(cleaner.getLogin());
        dto.setFio(cleaner.getFio());
        dto.setBirthdate(cleaner.getBirthdate());
        dto.setOrders(cleaner.getOrders());
        return dto;
    }

    public static Cleaner toEntity (CleanerDTO dto) {
        Cleaner cleaner = new Cleaner();
        cleaner.setId(dto.getId());
        cleaner.setLogin(dto.getLogin());
        cleaner.setFio(dto.getFio());
        cleaner.setBirthdate(dto.getBirthdate());
        cleaner.setOrders(dto.getOrders());
        return cleaner;
    }

}
