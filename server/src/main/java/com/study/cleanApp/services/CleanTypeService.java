package com.study.cleanApp.services;

import com.study.cleanApp.models.Area;
import com.study.cleanApp.models.CleanType;
import com.study.cleanApp.repositories.ICleanTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CleanTypeService {
    @Autowired
    private ICleanTypeRepository cleanTypeRepository;

    public CleanType getCleanType() {
        return null;
    }
}
