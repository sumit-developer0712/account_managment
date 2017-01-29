'use strict';

var util = require('util');
var async = require('async')
var sample_data = {
    "account": [
        {
            "acctID": "1",
            "acctTypeID": "s1",
            "openDate": "9/22/03",
            "status": "o",
            "amount": "$871.74 "
        },
        {
            "acctID": "2",
            "acctTypeID": "s1",
            "openDate": "6/3/87",
            "status": "o",
            "amount": "$4,987.99 "
        },
        {
            "acctID": "3",
            "acctTypeID": "s3",
            "openDate": "1/18/69",
            "status": "o",
            "amount": "$777.47 "
        },
        {
            "acctID": "4",
            "acctTypeID": "s3",
            "openDate": "11/13/49",
            "status": "c",
            "amount": "$7,046.58 "
        },
        {
            "acctID": "5",
            "acctTypeID": "c2",
            "openDate": "4/12/88",
            "status": "c",
            "amount": "$3,996.22 "
        },
        {
            "acctID": "6",
            "acctTypeID": "c2",
            "openDate": "4/25/52",
            "status": "o",
            "amount": "$7,595.11 "
        },
        {
            "acctID": "7",
            "acctTypeID": "c1",
            "openDate": "2/5/37",
            "status": "o",
            "amount": "$633.70 "
        },
        {
            "acctID": "8",
            "acctTypeID": "c1",
            "openDate": "5/12/14",
            "status": "o",
            "amount": "$1,352.51 "
        }
    ],
    "individual": [
        {
            "indID": "3",
            "first": "Lulu",
            "middle": "Della",
            "last": "Lyons",
            "street": "1492 Rigfil River",
            "city": "Esiuzupel",
            "state": "AK",
            "zip": "19203"
        },
        {
            "indID": "5",
            "first": "Leila",
            "middle": "Amelia",
            "last": "Lamb",
            "street": "1643 Codke Highway",
            "city": "Elgabe",
            "state": "DC",
            "zip": "46272"
        },
        {
            "indID": "13",
            "first": "Theresa",
            "middle": "Ann",
            "last": "Montgomery",
            "street": "1361 Gahwo Circle",
            "city": "Odguvlan",
            "state": "SD",
            "zip": "70110"
        },
        {
            "indID": "15",
            "first": "Lilly",
            "middle": "Ruby",
            "last": "Griffin",
            "street": "705 Jeme Way",
            "city": "Najirgi",
            "state": "ID",
            "zip": "39282"
        },
        {
            "indID": "16",
            "first": "Floyd",
            "middle": "Isaiah",
            "last": "Knight",
            "street": "212 Cuib Pike",
            "city": "Akiraku",
            "state": "KY",
            "zip": "38765"
        },
        {
            "indID": "17",
            "first": "Harold",
            "middle": "Johnny",
            "last": "Morrison",
            "street": "102 Pihjo Key",
            "city": "Faoffeg",
            "state": "AL",
            "zip": "74929"
        }
    ],
    "accountOwner": [
        {
            "acctID": "1",
            "indID": "3"
        },
        {
            "acctID": "1",
            "indID": "5"
        },
        {
            "acctID": "2",
            "indID": "13"
        },
        {
            "acctID": "3",
            "indID": "15"
        },
        {
            "acctID": "3",
            "indID": "16"
        },
        {
            "acctID": "4",
            "indID": "17"
        },
        {
            "acctID": "4",
            "indID": "3"
        },
        {
            "acctID": "5",
            "indID": "5"
        },
        {
            "acctID": "6",
            "indID": "13"
        },
        {
            "acctID": "6",
            "indID": "15"
        },
        {
            "acctID": "7",
            "indID": "16"
        },
        {
            "acctID": "8",
            "indID": "17"
        }
    ],
    "accountType": [
        {
            "acctTypeID": "s3",
            "typeName": "Gold Savings"
        },
        {
            "acctTypeID": "s2",
            "typeName": "Silver Savings"
        },
        {
            "acctTypeID": "s1",
            "typeName": "Bronze Savings"
        },
        {
            "acctTypeID": "c3",
            "typeName": "Gold Checking"
        },
        {
            "acctTypeID": "c2",
            "typeName": "Silver Checking"
        },
        {
            "acctTypeID": "c1",
            "typeName": "Bronze Checking"
        }
    ]
};

module.exports = {
    displayIndividuals: displayIndividuals,
    displayAccountTypes:displayAccountTypes
};

function displayIndividuals(req, res){
    var individual_summary = [];
    async.eachSeries(sample_data.individual, function(individualItem,eachIndividualCallback){
        var temp_individual_summary={};
        var accounts_related_to_individual = [];
        temp_individual_summary["id"] = individualItem.indID;
        temp_individual_summary["first_name"] = individualItem.indID;
        temp_individual_summary["middle_name"] = individualItem.indID;
        temp_individual_summary["last_name"] = individualItem.indID;
        temp_individual_summary["street"] = individualItem.indID;
        temp_individual_summary["city"] = individualItem.indID;
        temp_individual_summary["state"] = individualItem.indID;
        temp_individual_summary["zip"] = individualItem.indID;
        async.eachSeries(sample_data.accountOwner, function(accountOwnerItem,eachAccountOwnerCallback){
            if(accountOwnerItem.indID == individualItem.indID){
                async.eachSeries(sample_data.account, function(accountItem,eachAccountCallback){
                    if(accountItem.acctID == accountOwnerItem.acctID){
                        var temp_account={};
                        temp_account["account_id"] = accountItem.acctID;
                        temp_account["account_opening_date"] = accountItem.openDate;
                        temp_account["account_status"] = accountItem.status;
                        temp_account["amount"] = accountItem.amount;
                        async.eachSeries(sample_data.accountType, function (accountTypeItem,eachAccountTypeCallback) {
                            if(accountTypeItem.acctTypeID == accountItem.acctTypeID){
                                temp_account["account_type"] = accountTypeItem.typeName;
                                eachAccountTypeCallback();
                            }else{
                                eachAccountTypeCallback();
                            }
                        },function(err){
                            accounts_related_to_individual.push(temp_account);
                            eachAccountCallback();
                        });
                    }else{
                        eachAccountCallback();
                    }
                },function(err){
                    eachAccountOwnerCallback();
                });
            }else{
                eachAccountOwnerCallback();
            }
        },function(err){
            temp_individual_summary["account"] = accounts_related_to_individual;
            individual_summary.push(temp_individual_summary);
            eachIndividualCallback();
        });
    },function(err){
        res.json({message:"Account owner List",data:individual_summary});
    });
}

function displayAccountTypes(req, res) {
    var account_summary = [];
    async.eachSeries(sample_data.accountType, function(accountTypeItem,eachAccountTypeCallback){
        var temp_account_summary={};
    },function(err){
        res.json({message:"Account List",data:account_summary});
    });
}
