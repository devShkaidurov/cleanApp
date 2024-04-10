package com.study.cleanApp.dto;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import com.study.cleanApp.models.Cleaner;
import com.study.cleanApp.models.Customer;

import lombok.Data;

@Data
public class RegisterUser {
    private String login;
    private String password;

    public static Customer toCustomer (RegisterUser user) throws NoSuchAlgorithmException {
        Customer customer = new Customer();
        customer.setLogin(user.getLogin());
        customer.setPassword(RegisterUser.toHexString(RegisterUser.getSHA(user.getPassword())));
        return customer;
    }

    public static Cleaner toCleaner (RegisterUser user) throws NoSuchAlgorithmException {
        Cleaner cleaner = new Cleaner();
        cleaner.setLogin(user.getLogin());
        cleaner.setPassword(RegisterUser.toHexString(RegisterUser.getSHA(user.getPassword())));
        return cleaner;
    }

    public static byte[] getSHA(String input) throws NoSuchAlgorithmException {  
        MessageDigest md = MessageDigest.getInstance("SHA-256");  
        return md.digest(input.getBytes(StandardCharsets.UTF_8));  
    }  
      
    public static String toHexString(byte[] hash) {  
        BigInteger number = new BigInteger(1, hash);  
        StringBuilder hexString = new StringBuilder(number.toString(16));  
        while (hexString.length() < 32) {  
            hexString.insert(0, '0');  
        }  
  
        return hexString.toString();  
    } 
}
