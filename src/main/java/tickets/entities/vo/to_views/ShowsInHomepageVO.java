package tickets.entities.vo.to_views;

import java.util.List;

/**
 * Created by a297 on 18/3/22.
 */
public class ShowsInHomepageVO {
    private List carouselShows;
    private List vocalConcertShows;
    private List concertShows;
    private List operaShows;
    private List dramaShows;
    private List danceShows;
    private List childrenShows;
    private List comicShows;

    public List getCarouselShows() {
        return carouselShows;
    }

    public void setCarouselShows(List carouselShows) {
        this.carouselShows = carouselShows;
    }

    public List getVocalConcertShows() {
        return vocalConcertShows;
    }

    public void setVocalConcertShows(List vocalConcertShows) {
        this.vocalConcertShows = vocalConcertShows;
    }

    public List getConcertShows() {
        return concertShows;
    }

    public void setConcertShows(List concertShows) {
        this.concertShows = concertShows;
    }

    public List getOperaShows() {
        return operaShows;
    }

    public void setOperaShows(List operaShows) {
        this.operaShows = operaShows;
    }

    public List getDramaShows() {
        return dramaShows;
    }

    public void setDramaShows(List dramaShows) {
        this.dramaShows = dramaShows;
    }

    public List getDanceShows() {
        return danceShows;
    }

    public void setDanceShows(List danceShows) {
        this.danceShows = danceShows;
    }

    public List getChildrenShows() {
        return childrenShows;
    }

    public void setChildrenShows(List childrenShows) {
        this.childrenShows = childrenShows;
    }

    public List getComicShows() {
        return comicShows;
    }

    public void setComicShows(List comicShows) {
        this.comicShows = comicShows;
    }

    @Override
    public String toString() {
        return "ShowsInHomepageVO{" +
                "carouselShows=" + carouselShows +
                ", vocalConcertShows=" + vocalConcertShows +
                ", concertShows=" + concertShows +
                ", operaShows=" + operaShows +
                ", dramaShows=" + dramaShows +
                ", danceShows=" + danceShows +
                ", childrenShows=" + childrenShows +
                ", comicShows=" + comicShows +
                '}';
    }
}
