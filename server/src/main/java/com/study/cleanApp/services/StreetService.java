package com.study.cleanApp.services;

import com.study.cleanApp.models.Area;
import com.study.cleanApp.models.Street;
import com.study.cleanApp.repositories.IStreetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StreetService {
    @Autowired
    private IStreetRepository streetRepository;

    public Street getStreet() {
        return null;
    }
}
