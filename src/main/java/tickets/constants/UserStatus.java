package tickets.constants;

/**
 * Created by a297 on 18/2/7.
 */
public enum UserStatus {
    INACTIVE("INACTIVE", 0), ACTIVE("ACTIVE", 1), INVALID("INVALID", -1);

    private String name;
    private int index;

    UserStatus(String name, int index) {
        this.name = name;
        this.index = index;
    }

    public String getName() {
        return name;
    }

    public int getIndex() {
        return index;
    }
}
