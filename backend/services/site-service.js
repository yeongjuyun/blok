import { siteModel } from "../db";
import { BadRequestError, ForbiddenError } from "../errors";

class SiteService {
    constructor(siteModel) {
        this.siteModel = siteModel;
    }

    // 사이트 추가
    async addSite(siteInfo) {
        const { siteName, domain, siteTemplete } = siteInfo;
        const site = await this.siteModel.findBySiteName(siteName);
        if (site) {
            throw new BadRequestError(
                "이 사이트 이름은 현재 사용중입니다. 다른 사이트 이름을 입력해 주세요."
            );
        }
        const newSiteInfo = { siteName, domain, siteTemplete };
        const createdNewSite = await this.siteModel.create(newSiteInfo);
        return createdNewSite;
    }

    // 사이트 목록을 받음.
    async getSites() {
        const sites = await this.siteModel.findAll();
        return sites;
    }

    // 특정 사이트 정보 조회
    async getSiteInfo(siteName) {
        const site = await this.siteModel.findBySiteName(siteName);
        if (!site) {
            throw new BadRequestError("존재하지 않는 사이트입니다.");
        }
        return site;
    }

    // 사이트 정보 수정
    async setSite(siteName, toUpdate) {
        let site = await this.siteModel.findBySiteName(siteName);
        if (!site) {
            throw new BadRequestError(
                "등록된 사이트가 없습니다. 다시 한 번 확인해 주세요."
            );
        }
        site = await this.siteModel.update({ siteName, update: toUpdate });
        return site;
    }

    // 회원 삭제 구현, 추후 수정예정
    async deleteSite(siteName) {
        const site = await this.siteModel.delete(siteName);
        return site;
    }
}

const siteService = new SiteService(siteModel);

export { siteService };
