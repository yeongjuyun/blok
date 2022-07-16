import { siteModel } from "../db";
import { BadRequestError, ForbiddenError } from "../errors";

class SiteService {
  constructor(siteModel) {
    this.siteModel = siteModel;
  }

  // 사이트 추가
  async addSite(siteInfo) {
    const { owner, name, domain } = siteInfo;
    const siteNameCheck = await this.siteModel.findBySiteName(name);
    const siteDomainCheck = await this.siteModel.findBySiteDomain(domain);
    if (siteNameCheck || siteDomainCheck) {
      throw new BadRequestError(
        "이 사이트의 이름/도메인은 현재 사용중입니다. 다른 사이트 이름/도메인을 입력해 주세요"
      );
    }

    const newSiteInfo = { owner, name, domain };
    const createdNewSite = await this.siteModel.create(newSiteInfo);
    return createdNewSite;
  }

  // 특정 사이트 정보 조회
  async getSiteInfo(siteIdentifier) {
    const site = await this.siteModel.findBySiteName(siteIdentifier);
    if (!site) {
      throw new BadRequestError("존재하지 않는 사이트입니다.");
    }
    return site;
  }
  // 전체 사이트 정보 조회
  async getSitesInfo() {
    const sites = await this.siteModel.findAllSite();
    return sites;
  }
  // // 유저가 가진 사이트 목록을 받음.
  // async getSites(userId) {
  //   const sites = await this.siteModel.findAllUserSites(userId);
  //   return sites;
  // }

  // 사이트 정보 수정
  async updateSite(siteName, toUpdate) {
    let site = await this.siteModel.findBySiteName(siteName);
    if (!site) {
      throw new BadRequestError(
        "등록된 사이트가 없습니다. 다시 한 번 확인해 주세요."
      );
    }
    site = await this.siteModel.update({ siteName, update: toUpdate });
    return site;
  }

  // 사이트 삭제 구현
  async deleteSite(siteIdentifier) {
    const site = await this.siteModel.delete(siteIdentifier);
    return site;
  }
}

const siteService = new SiteService(siteModel);

export { siteService };
