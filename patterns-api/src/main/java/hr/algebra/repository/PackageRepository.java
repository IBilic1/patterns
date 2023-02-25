package hr.algebra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import hr.algebra.model.Package;

public interface PackageRepository extends JpaRepository<Package, Long> {
}
