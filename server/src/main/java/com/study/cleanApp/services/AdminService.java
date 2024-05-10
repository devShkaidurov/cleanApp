package com.study.cleanApp.services;

import com.study.cleanApp.dto.CleanerAdminDTO;
import com.study.cleanApp.dto.CleanerDTO;
import com.study.cleanApp.dto.OrderDTO;
import com.study.cleanApp.repositories.IOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final IOrderRepository orderRepository;
    private final JdbcTemplate jdbcTemplate;

    public List<OrderDTO> getActive () {
        List<OrderDTO> list = jdbcTemplate.query(
                        "select * from orders where status != -1 and status != -2",
                new RowMapper<OrderDTO>() {
                    @Override
                    public OrderDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
                        OrderDTO orderDTO = new OrderDTO();
                        orderDTO.setId(rs.getInt("id"));
                        orderDTO.setStatus(rs.getInt("status"));
                        orderDTO.setOrderAddress(rs.getString("order_address"));
                        orderDTO.setOrderDate(rs.getDate("order_date"));
                        orderDTO.setOrderType(rs.getInt("order_type"));
                        orderDTO.setDone(rs.getBoolean("is_done"));
                        orderDTO.setPrice(rs.getInt("price"));
                        orderDTO.setCleanType(rs.getInt("clean_type"));
                        orderDTO.setSquare(rs.getInt("square"));
                        return orderDTO;
                    }
                });
        if (list.isEmpty())
            return null;
        return list;
    }

    public List<OrderDTO> getDone() {
        List<OrderDTO> list = jdbcTemplate.query(
                "select * from orders where status = -1 or status = -2",
                new RowMapper<OrderDTO>() {
                    @Override
                    public OrderDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
                        OrderDTO orderDTO = new OrderDTO();
                        orderDTO.setId(rs.getInt("id"));
                        orderDTO.setStatus(rs.getInt("status"));
                        orderDTO.setOrderAddress(rs.getString("order_address"));
                        orderDTO.setOrderDate(rs.getDate("order_date"));
                        orderDTO.setOrderType(rs.getInt("order_type"));
                        orderDTO.setDone(rs.getBoolean("is_done"));
                        orderDTO.setPrice(rs.getInt("price"));
                        orderDTO.setCleanType(rs.getInt("clean_type"));
                        orderDTO.setSquare(rs.getInt("square"));
                        return orderDTO;
                    }
                });
        if (list.isEmpty())
            return null;
        return list;
    }

    public List<CleanerAdminDTO> getCleaners () {
        List<CleanerAdminDTO> listDTOs = jdbcTemplate.query(
                    "select " +
                            " cl.fio as fio," +
                            " cl.id as id," +
                            " sum(ord.price) as salary," +
                            " count(ord.id) as countOrders," +
                            " avg(rev.value) as avgReview" +
                            " from cleaners cl" +
                            " inner join orders ord" +
                            " on ord.cleaner_id = cl.id" +
                            " left join reviews rev" +
                            " on rev.id = ord.fk_review_id" +
                            " group by cl.id"

                , CleanerAdminDTO.cleanerMapper);
        return listDTOs;
    }
}
