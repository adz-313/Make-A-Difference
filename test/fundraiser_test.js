const FundraiserContract = artifacts.require("Fundraiser");

contract("Fundraiser", accounts => {
  let fundraiser;
  const name =  "Beneficiary Name";
  const url = "beneficiaryname.org";
  const imageURL = "https://placekitten.com/600/350";
  const description = "Beneficiary description";
  const owner = accounts[0];
  const beneficiary = accounts[1];

  beforeEach(async () => {
    fundraiser = await FundraiserContract.new(
      name,
      url,
      imageURL,
      description,
      owner,
      beneficiary,
    )
  });

  describe("initialization", () => {
    it("gets the beneficiary name", async () => {
      const actual = await fundraiser.name();
      assert.equal(actual, name, "names should match");
    });

    it("gets the beneficiary url", async () => {
      const actual = await fundraiser.url();
      assert.equal(actual, url, "url should match");
    });

    it("gets the beneficiary image url", async () => {
      const actual = await fundraiser.imageURL();
      assert.equal(actual, imageURL, "imageURL should match");
    });

    it("gets the beneficiary description", async () => {
      const actual = await fundraiser.description();
      assert.equal(actual, description, "description should match");
    });

    it("gets the beneficiary", async () => {
      const actual = await fundraiser.beneficiary();
      assert.equal(actual, beneficiary, "beneficiary addresses should match");
    });

    it("gets the owner", async () => {
      const actual = await fundraiser.owner();
      assert.equal(actual, owner, "owner should match");
    });
  });

  describe("set beneficiary", () => {
    const newBeneficiary = accounts[2];

    it("updated beneficiary when called by owner account", async () => {
      await fundraiser.setBeneficiary(newBeneficiary, { from: owner });
      const actual = await fundraiser.beneficiary();
      assert.equal(actual, newBeneficiary, "beneficiaries should match");
    });

    it("throws an error when called from a non-owner account", async () => {
      try {
        await fundraiser.setBeneficiary(newBeneficiary, { from: accounts[3] });
        assert.equal(false, "setting was not restricted to owner")
      } catch (e) {
        const expected = "Ownable: caller is not the owner";
        const actual = e.reason;
        assert.equal(actual, expected, "should not be permitted");
      }
    });
  });

  describe("making donations", () => {
    const value = web3.utils.toWei('0.0289');
    const donor = accounts[2];

    it("increases myDonationsCount", async () => {
      const currentCount = await fundraiser.myDonationsCount({ from: donor });
      await fundraiser.donate({ from: donor, value })
      const newCount = await fundraiser.myDonationsCount({ from: donor });
      const diff = newCount - currentCount
      assert.equal(1, diff, "myDonationsCount should increment by 1")
    });

    it("includes donation in myDonations", async () => {
      await fundraiser.donate({ from: donor, value });
      const { values, dates } = await fundraiser.myDonations({ from: donor });
      assert.equal(value, values[0], "value should match");
      assert(dates[0], "date should be present");
    });

    it("increases the totalDonations amount", async () => {
      const currentAmount = await fundraiser.totalDonations();
      await fundraiser.donate({ from: donor, value });
      const newAmount = await fundraiser.totalDonations();
      const diff = newAmount - currentAmount;

      assert.equal(diff, value, "difference should match the donation value");
    });

    it("increases donationsCount", async () => {
      const currentCount = await fundraiser.donationsCount();
      await fundraiser.donate({ from: donor, value });
      const newCount = await fundraiser.donationsCount();
      const diff = newCount - currentCount;
      assert.equal(1, diff, "donationsCount should increase by 1");
    });

    it("emits the DonationReceived event", async () => {
      const tx = await fundraiser.donate({ from: donor, value });
      const expectedEvent = "DonationReceived";
      const actualEvent = tx.logs[0].event;

      assert.equal(actualEvent, expectedEvent, "events should match");
    });
  });

  describe("withdrawing funds", () => {
    beforeEach(async () => {
      const value = web3.utils.toWei('0.1');
      const donor = accounts[2];
      await fundraiser.donate({ from: donor, value });
    })

    describe("access controls", () => {
      it("throws an error when called from a non-owner account", async () => {
        try {
          await fundraiser.withdraw({ from: accounts[3] });
          assert.fail("withdraw was not restricted to owners");
        } catch (e) {
          const actualError = e.reason;
          const expectedError = "Ownable: caller is not the owner";
          assert.equal(actualError, expectedError, "");
        }
      });

      it("permits the owner to call the function", async () => {
        try {
          await fundraiser.withdraw({ from: owner });
          assert(true, "no errros were thrown");
        } catch (e) {
          assert.fail("should not have thrown an error");
        }
      });
    });

    it("transfers balance to beneficiary", async () => {
      const currentContractBalance = await web3.eth.getBalance(fundraiser.address);
      const currentBeneficiaryBalance = await web3.eth.getBalance(beneficiary);

      await fundraiser.withdraw({ from: owner });

      const newContractBalace = await web3.eth.getBalance(fundraiser.address);
      const newBeneficiaryBalance = await web3.eth.getBalance(beneficiary);
      const diffBeneficiaryBalance = newBeneficiaryBalance - currentBeneficiaryBalance;

      assert.equal(newContractBalace, 0, "contract should have a 0 balance");
      assert.equal(diffBeneficiaryBalance, currentContractBalance, "beneficiary should receive all the funds");
    });

    it("emits Withdraw event", async () => {
      const tx = await fundraiser.withdraw({ from: owner });
      const actualEvent = tx.logs[0].event;
      const expectedEvent = 'Withdraw';
      assert.equal(actualEvent, expectedEvent, "events should match");
    });

    describe("receive function", () => {
      const value = web3.utils.toWei('0.0289');

      it("increases the totalDonations amount", async () => {
        const currentAmount = await fundraiser.totalDonations();
        await web3.eth.sendTransaction({
          from: accounts[9], to: fundraiser.address, value,
        })
        const newAmount = await fundraiser.totalDonations();
        const diff = newAmount - currentAmount;

        assert.equal(diff, value, "difference should match the donation value");
      });

      it("increases donationsCount", async () => {
        const currentCount = await fundraiser.donationsCount();
        await web3.eth.sendTransaction({
          from: accounts[9], to: fundraiser.address, value,
        })
        const newCount = await fundraiser.donationsCount();
        const diff = newCount - currentCount;
        assert.equal(1, diff, "donationsCount should increase by 1");
      });
    });
  });
});
