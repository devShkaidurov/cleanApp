package com.study.cleanApp.dto;

import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;

import com.study.cleanApp.models.Cleaner;
import com.study.cleanApp.models.Order;

import lombok.Data;

@Data
public class CreateCleanerDTO {
    private String login;
    private String fio;
    private Date birthday;
    private String password;

    public static CreateCleanerDTO fromEntity (Cleaner cleaner) {
        CreateCleanerDTO dto = new CreateCleanerDTO();
        dto.setLogin(cleaner.getLogin());
        dto.setFio(cleaner.getFio());
        dto.setBirthday(cleaner.getBirthdate());
        dto.setPassword(cleaner.getPassword());
        return dto;
    }

    public static Cleaner toEntity (CreateCleanerDTO dto) throws NoSuchAlgorithmException {
        Cleaner cleaner = new Cleaner();
        cleaner.setLogin(dto.getLogin());
        cleaner.setFio(dto.getFio());
        cleaner.setBirthdate(dto.getBirthday());
        cleaner.setPassword(RegisterUser.toHexString(RegisterUser.getSHA(dto.getPassword())));
        return cleaner;
    }

}
