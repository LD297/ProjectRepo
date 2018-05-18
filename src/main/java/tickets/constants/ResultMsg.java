package tickets.constants;

/**
 * Created by a297 on 18/2/7.
 */
public enum ResultMsg {
    GOTOACTIVATE("GOTOAVTIVATE"), GOTOLOGIN("GOTOLOGIN"), ERROR("ERROR"),
    GOTOHOMEPAGE("GOTOHOMEPAGE"), WRONGPSW("WRONGPSW");

    private String msg;

    ResultMsg(String msg) {
        this.msg = msg;
    }

    public String toString() {
        return msg;
    }
}
