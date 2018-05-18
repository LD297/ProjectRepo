package tickets.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tickets.entities.po.UserPO;

import java.util.List;

/**
 * Created by a297 on 18/2/6.
 */
public interface UsersRepository extends JpaRepository<UserPO, String> {
    UserPO findByEmail(String email);

    UserPO findByCookie(String cookie);

    List<UserPO> findByCancel(int i);
}