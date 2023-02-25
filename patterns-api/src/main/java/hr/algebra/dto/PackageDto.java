package hr.algebra.dto;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class PackageDto {

    private Long id;

    private String title;

    private double uploadSize;

    private int dailyUploadLimit;

    private double price;

    public PackageDto() {
    }

    public PackageDto(Long id, String title, double uploadSize, int dailyUploadLimit, double price) {
        this.id = id;
        this.title = title;
        this.uploadSize = uploadSize;
        this.dailyUploadLimit = dailyUploadLimit;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getUploadSize() {
        return uploadSize;
    }

    public void setUploadSize(double uploadSize) {
        this.uploadSize = uploadSize;
    }

    public int getDailyUploadLimit() {
        return dailyUploadLimit;
    }

    public void setDailyUploadLimit(int dailyUploadLimit) {
        this.dailyUploadLimit = dailyUploadLimit;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
