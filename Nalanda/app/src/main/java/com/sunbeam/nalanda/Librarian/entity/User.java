package com.sunbeam.nalanda.Librarian.entity;
import java.io.Serializable;

public class User implements Serializable {
    private int idusers;
    private String uName;
    private String uEmail;
    private String uContact;
  //  private String uCreatedAt;
    private String uPassword;


    public User() {
    }

    public User(int idusers, String uName, String uEmail, String uContact, String uCreatedAt, String uPassword) {
        this.idusers = idusers;
        this.uName = uName;
        this.uEmail = uEmail;
        this.uContact = uContact;
        this.uPassword = uPassword;
    }

    public int getIdusers() {
        return idusers;
    }

    public void setIdusers(int idusers) {
        this.idusers = idusers;
    }

    public String getuName() {
        return uName;
    }

    public void setuName(String uName) {
        this.uName = uName;
    }

    public String getuEmail() {
        return uEmail;
    }

    public void setuEmail(String uEmail) {
        this.uEmail = uEmail;
    }

    public String getuContact(String uContact) {
        return this.uContact;
    }

    public void setuContact(String uContact) {
        this.uContact = uContact;
    }

   /* public String getuCreatedAt() {
        return uCreatedAt;
    }

    public void setuCreatedAt(String uCreatedAt) {
        this.uCreatedAt = uCreatedAt;
    }*/

    public String getuPassword() {
        return uPassword;
    }

    public void setuPassword(String uPassword) {
        this.uPassword = uPassword;
    }


    @Override
    public String toString() {
        return
                "uName=" + uName + '\n' +
                ", uEmail='" + uEmail + '\n' +
                ", uContact='" + uContact + '\n'  ;
    }
}

