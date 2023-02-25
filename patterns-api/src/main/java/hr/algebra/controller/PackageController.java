package hr.algebra.controller;

import hr.algebra.dto.PackageDto;
import hr.algebra.mapper.PackageDtoMapper;
import hr.algebra.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/package")
@CrossOrigin
public class PackageController {

    private final PackageService packageService;

    private final PackageDtoMapper packageDtoMapper;


    @Autowired
    public PackageController(PackageService packageService, PackageDtoMapper packageDtoMapper) {
        this.packageService = packageService;
        this.packageDtoMapper = packageDtoMapper;
    }

    @GetMapping
    public ResponseEntity<List<PackageDto>> getAllPackages() {
        return new ResponseEntity<>(packageDtoMapper.mapToDto(packageService.getPackages()), HttpStatus.OK);
    }

}
