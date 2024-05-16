package com.study.cleanApp.services;

import com.study.cleanApp.models.Area;
import com.study.cleanApp.repositories.IAreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AreaService {
    @Autowired
    private IAreaRepository areaRepository;

    public Area getArea() {
        return null;
    }
}
