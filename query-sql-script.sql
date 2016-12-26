SELECT a.* FROM D101_TRAIN_DIR_DAY a WHERE a.TRAIN_CODE = 'G1214' ;
SELECT  a.STATION_TRAIN_CODE, a.* FROM D101_STOP_TIME_DAY a WHERE a.STATION_TRAIN_CODE = 'G1214';


SELECT * FROM D103_TRAIN_PRICE;
SELECT * FROM D103_TRAIN_PRICE a WHERE a.TRAIN_CODE='G1214' AND a.START_DATE < '2016-12-26' AND a.END_DATE > '2016-12-26';

findByTrainCodeAndStartDateBeforeAndEndDateAfter(trainCode, businessDate, businessDate)


select trainprice0_.id as id1_40_, trainprice0_.end_date as end_date2_40_, trainprice0_.prf_id as prf_id7_40_, trainprice0_.stprice_num as stprice_8_40_, trainprice0_.sbr_id as sbr_id9_40_, trainprice0_.tkr_id as tkr_id10_40_, trainprice0_.running_cycle as running_3_40_, trainprice0_.running_rule as running_4_40_, trainprice0_.start_date as start_da5_40_, trainprice0_.train_code as train_co6_40_ from d103_train_price trainprice0_ where trainprice0_.train_code='G1214' and trainprice0_.start_date<'2016-12-26' and trainprice0_.end_date>'2016-12-26'

select pricestati0_.id as id1_35_, pricestati0_.arrival_station_code as arrival_8_35_, pricestati0_.arrival_station_seq as arrival_2_35_, pricestati0_.bed_level as bed_leve3_35_, pricestati0_.board_station_code as board_st9_35_, pricestati0_.board_station_seq as board_st4_35_, pricestati0_.stprice_num as stprice10_35_, pricestati0_.seat_flag as seat_fla5_35_, pricestati0_.seat_type as seat_ty11_35_, pricestati0_.station_price_dj as station_6_35_, pricestati0_.station_price_et as station_7_35_, pricestati0_.ticket_type as ticket_12_35_ from d103_price_station_dtl pricestati0_ left outer join d103_price_station pricestati1_ on pricestati0_.stprice_num=pricestati1_.id left outer join d403_station station2_ on pricestati0_.board_station_code=station2_.station_code where pricestati1_.id='BKE' and station2_.station_code='G1214'