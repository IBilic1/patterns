package hr.algebra.model;

import liquibase.pro.packaged.C;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class UserConsumption {

    @Id
    @Column(name = "id_user_consumption")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private LocalDateTime dateTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "package_id")
    private Package package_;

    private double uploadSize;

    private int dailyUploadLimit;

    public UserConsumption() {
    }

    public UserConsumption(LocalDateTime dateTime, User user, Package package_, double uploadSize, int dailyUploadLimit) {
        this.dateTime = dateTime;
        this.user = user;
        this.package_ = package_;
        this.uploadSize = uploadSize;
        this.dailyUploadLimit = dailyUploadLimit;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Package getPackage_() {
        return package_;
    }

    public void setPackage_(Package package_) {
        this.package_ = package_;
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
}
