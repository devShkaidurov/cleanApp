package com.study.cleanApp.services;

import com.study.cleanApp.dto.CleanerAdminDTO;
import com.study.cleanApp.dto.CleanerDTO;
import com.study.cleanApp.dto.CreateCleanerDTO;
import com.study.cleanApp.dto.OrderDTO;
import com.study.cleanApp.models.Cleaner;
import com.study.cleanApp.repositories.ICleanerRepository;
import com.study.cleanApp.repositories.IOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.security.NoSuchAlgorithmException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final ICleanerRepository cleanerRepository;
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
                            " left join orders ord" +
                            " on ord.cleaner_id = cl.id" +
                            " left join reviews rev" +
                            " on rev.id = ord.fk_review_id" +
                            " group by cl.id" +
                            " order by cl.id"

                , CleanerAdminDTO.cleanerMapper);
        return listDTOs;
    }

    public CleanerDTO getCleaner (long id) {
        Optional<Cleaner> cleaner = cleanerRepository.findById(id);
        return cleaner.map(CleanerDTO::fromEntity).orElse(null);
    }

    public CleanerDTO addCleaner (CreateCleanerDTO dto) throws NoSuchAlgorithmException {
        Cleaner needCreate = CreateCleanerDTO.toEntity(dto);
        Cleaner created = cleanerRepository.save(needCreate);
        return CleanerDTO.fromEntity(created);
    }
}
