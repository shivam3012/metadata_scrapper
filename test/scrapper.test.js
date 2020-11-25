const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require("../app");

chai.use(chaiHttp);

describe('Metadata Scraping Test', () => {

  it('it should fetch the metadata of url', async () => {
    const res = await chai.request(app)
      .post('/api/scrape')
      .send({
        "url": "https://www.amazon.com/Moen-One-Handle-Pulldown-Kitchen-7594C/dp/B003IJ2UV2?ref_=Oct_DLandingS_D_552ef505_61&smid=ATVPDKIKX0DER"
      });
      const body = res.body;
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      body.should.all.have.property('status');
      body.should.all.have.property('data');
      body.should.all.have.property('error');
      body.status.should.equal(200);
      body.data.should.all.have.property('title');
      body.data.should.all.have.property('description');
      body.data.should.all.have.property('keywords');
      body.data.should.all.have.property('url');
      body.data.should.all.have.property('ogUrl');
      body.data.should.all.have.property('author');
      body.data.should.all.have.property('ogTitle');
      body.data.should.all.have.property('ogImage');
      body.data.should.all.have.property('ogkeywords');
      body.data.should.all.have.property('images');
  }).timeout(15000);

});