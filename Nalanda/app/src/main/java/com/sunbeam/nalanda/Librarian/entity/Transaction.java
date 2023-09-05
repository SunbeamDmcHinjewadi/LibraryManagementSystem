package com.sunbeam.nalanda.Librarian.entity;


import java.io.Serializable;
import java.sql.Date;

public class Transaction implements Serializable {

    private int idbooks_taken;
    private int user_id;
    private int book_id;
    private String book_name;
    private Date due_date;
    //private Date returned_date;
    private double fine_amount;
    private boolean isReturned;

    public Transaction() {
    }

    public Transaction(int idbooks_taken, int user_id, int book_id, String book_name, Date due_date/*Date returned_date*/, double fine_amount) {
        this.idbooks_taken = idbooks_taken;
        this.user_id = user_id;
        this.book_id = book_id;
        //this.issue_date = issue_date;
        this.book_name = book_name;
        this.due_date = due_date;
        //this.returned_date = returned_date;
        this.fine_amount = fine_amount;
    }

    public int getIdbooks_taken() {
        return this.idbooks_taken;
    }

    public void setIdbooks_taken(int idbooks_taken) {
        this.idbooks_taken = idbooks_taken;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getBook_id() {
        return this.book_id;
    }

    public void setBook_id(int book_id) {
        this.book_id = book_id;
    }


    public Date getDue_date() {
        return due_date;
    }

    public void setDue_date(Date due_date) {
        this.due_date = due_date;
    }

    public double getFine_amount() {
        return this.fine_amount;
    }

    public void setFine_amount(double fine_amount) {
        this.fine_amount = fine_amount;
    }

    public String getBook_name() {
        return book_name;
    }

    public void setBook_name(String book_name) {
        this.book_name = book_name;
    }

 /*   public Date getReturned_date() {
        return returned_date;
    }

    public void setReturned_date(Date returned_date) {
        this.returned_date = returned_date;
    }
*/


    public boolean isReturned() {
        return isReturned;
    }


    @Override
    public String toString() {
        return "Transaction{" +
                "idbooks_taken=" + idbooks_taken +
                ", user_id=" + user_id +
                ", book_id=" + book_id +
                ", book_name='" + book_name + '\'' +
                ", due_date=" + due_date +
                /*", returned_date=" + returned_date +*/
                ", fine_amount=" + fine_amount +
                '}';
    }


    public void setReturned(boolean returned) {
        isReturned = returned;

    }
}