package hr.algebra.service.impl;

import hr.algebra.model.Package;
import hr.algebra.repository.PackageRepository;
import hr.algebra.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PackageServiceImpl implements PackageService {

    private final PackageRepository packageRepository;

    @Autowired
    public PackageServiceImpl(PackageRepository packageRepository) {
        this.packageRepository = packageRepository;
    }

    @Override
    public List<Package> getPackages() {
        return packageRepository.findAll();
    }
}
