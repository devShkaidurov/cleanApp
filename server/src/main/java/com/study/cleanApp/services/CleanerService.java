package com.study.cleanApp.services;

import java.lang.StackWalker.Option;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.study.cleanApp.dto.CleanerDTO;
import com.study.cleanApp.dto.RegisterUser;
import com.study.cleanApp.models.Cleaner;
import com.study.cleanApp.repositories.ICleanerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CleanerService {
    private final ICleanerRepository cleanerRepository;

    public CleanerDTO auth (Optional<String> login, Optional<String> password) throws NoSuchAlgorithmException {
        if (login.isEmpty() || password.isEmpty())
            return null;
        List<Cleaner> listCleaner = cleanerRepository.findAllByLoginAndPassword(login.get(), RegisterUser.toHexString(RegisterUser.getSHA(password.get())));
        return listCleaner.size() == 0 ? null : CleanerDTO.fromEntity(listCleaner.get(0));
    }

    public CleanerDTO register (RegisterUser user) throws NoSuchAlgorithmException {
        Cleaner cleaner = RegisterUser.toCleaner(user);
        Cleaner saved = cleanerRepository.save(cleaner);
        return saved == null ? null : CleanerDTO.fromEntity(saved);
    }
    
    public List<CleanerDTO> getAll () {
        List<Cleaner> cleaners = cleanerRepository.findAll();
        return cleaners.stream()
            .map(CleanerDTO::fromEntity)
            .toList();
    } 

}
