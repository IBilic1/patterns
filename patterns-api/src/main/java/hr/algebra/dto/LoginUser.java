package hr.algebra.dto;

import com.sun.istack.NotNull;

public class LoginUser {

    @NotNull
    private String password;

    @NotNull
    private String email;

    public LoginUser() {
    }

    public LoginUser(String password, String email) {
        this.password = password;
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
