<ScrollView style={{height: '40%', gap: 10}}>
                <View
                  style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                  {products.map((item, id) => {
                    item.productPrice =
                      Number(item.bag) * item.count * item.productPrice;
                    const backgroundColor = Customerfrombill.some(
                      p => p._id === item._id,
                    )
                      ? '#e0ccff'
                      : '#f7f7f7';
                    return (
                      <Pressable
                        onPress={() => {}}
                        key={id}
                        style={{
                          backgroundColor,
                          width: '100%',
                          padding: 3,
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 10,
                          justifyContent: 'space-between',
                          alignContent: 'center',
                          borderRadius: 8,
                        }}>
                        <View
                          style={{
                            width: '15%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={{
                              uri: `data:image/jpeg;base64,${item.image}`,
                            }} // Use base64 directly
                            style={styles.image}
                          />
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            width: '40%',
                          }}>
                          <View>
                            <Text
                              style={{
                                fontSize: 18,
                                color: '#000',
                                fontWeight: '500',
                              }}>
                              {item.productName}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#4d4d4d',
                                fontWeight: '500',
                              }}>
                              Selling Price : {item.sellingPrice}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#4d4d4d',
                                fontWeight: '500',
                              }}>
                              Purchased Price : {item.purchasePrice}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            alignItems: 'flex-start',
                            width: '30%',
                          }}>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: 7,
                              width: '100%',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#4d4d4d',
                                fontWeight: '500',
                                alignItems: 'center',
                              }}>
                              Bag :
                            </Text>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '64%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 8,
                              }}>
                              <TextInput
                                keyboardType="numeric"
                                style={{
                                  paddingRight: 10,
                                  paddingLeft: 10,
                                  borderRadius: 8,
                                  color: '#000',
                                  width: '80%',
                                  padding: 0,
                                }}
                                value={item.bag}
                                onChangeText={text =>
                                  handleBagChange(item._id, text)
                                }
                              />
                              <Text style={{color: '#333333'}}> bags</Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: 7,
                              alignItems: 'center',
                              height: 30,
                              justifyContent: 'flex-start',
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#4d4d4d',
                                fontWeight: '500',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              QTY :
                            </Text>
                            <View
                              style={{
                                width: '60%',
                                paddingTop: 0,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <TextInput
                                keyboardType="numeric"
                                style={{
                                  paddingRight: 10,
                                  paddingLeft: 10,
                                  borderRadius: 8,
                                  color: '#000',
                                  width: '80%',
                                  padding: 0,
                                }}
                                value={item.quantity}
                                onChangeText={text =>
                                  handleQuantityChange(item._id, text)
                                }
                              />
                              <Text style={{color: '#333333'}}> kg</Text>
                            </View>
                          </View>
                          <Text>
                            {item.bag * item.count * item.productPrice}
                          </Text>
                        </View>

                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignContent: 'center',
                            gap: 20,
                            padding: 5,
                            width: '15%',
                          }}>
                          {Customerfrombill.some(p => p._id === item._id) ? (
                            <TouchableOpacity
                              onPress={() => {
                                setCheckbox(true);
                                dispatch(removeCustomerFromBill(item._id)); // Fix the payload type
                                console.log(item._id, 'removed');
                              }}>
                              <CustomIcon
                                color={
                                  Customerfrombill.some(p => p._id === item._id)
                                    ? '#196'
                                    : '#4d4d4d'
                                }
                                size={20}
                                name="checkbox"
                                type="Ionicons"
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => {
                                if (item.quantity && item.bag) {
                                  setCheckbox(false);
                                  console.log(item._id, 'added');
                                  dispatch(addCustomerToBill(item)); // Fix the payload type
                                  setErrmsg('');
                                } else {
                                  setErrmsg(
                                    '*Please fill in both bag and quantity fields.',
                                  );
                                }
                              }}>
                              <CustomIcon
                                color={
                                  Customerfrombill.some(p => p._id === item._id)
                                    ? '#196'
                                    : '#4d4d4d'
                                }
                                size={20}
                                name="checkbox-blank-outline"
                                type="MaterialCommunityIcons"
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              </ScrollView>