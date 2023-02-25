package hr.algebra.service;

import hr.algebra.model.Package;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PackageService {

    List<Package> getPackages();
}
