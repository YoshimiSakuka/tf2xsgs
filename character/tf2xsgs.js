 'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'tf2xsgs',
	    character:{
			scout:['male','wei',4,['jisu','shuangtiao','xiandan']],
			scout1:['male','wei',4,['jisu','shuangtiao','xiandan']],
			scout2:['male','wei',4,['jisu','shuangtiao','xiandan']],
			soldier:['male','wei',4,['fenzhan','feiyue','jingzhun']],
			soldier1:['male','wei',4,['fenzhan','feiyue','jingzhun']],
			soldier2:['male','wei',4,['fenzhan','feiyue','jingzhun']],
            pyro:['male','wei',4,['lieyan','fantan']],
            pyro1:['male','wei',4,['lieyan','fantan']],
            pyro2:['male','wei',4,['lieyan','fantan']],
            demoman:['male','wei',4,['nianrui','qixiang']],
            demoman1:['male','wei',4,['nianrui','qixiang']],
            demoman2:['male','wei',4,['nianrui','qixiang']],
            heavy:['male','wei',4,['nianrui','qixiang']],
            heavy1:['male','wei',4,['nianrui','qixiang']],
            heavy2:['male','wei',4,['nianrui','bushao']],
            engineer:['male','wei',5,['bujiqi','bushao']],
            engineer1:['male','wei',5,['bujiqi','bushao']],
            engineer2:['male','wei',5,['bujiqi','bushao']],
            spy:['male','wei',4,['nianrui','qixiang']],
            spy1:['male','wei',4,['nianrui','qixiang']],
            spy2:['male','wei',4,['nianrui','qixiang']],
            sniper:['male','wei',4,['nianrui','qixiang']],
            sniper1:['male','wei',4,['nianrui','qixiang']],
            sniper2:['male','wei',4,['nianrui','qixiang']],
            medic:['male','wei',4,['nianrui','qixiang']],
            medic1:['male','wei',4,['nianrui','qixiang']],
            medic2:['male','wei',4,['nianrui','qixiang']],
	    },
	    skill:{
	        jisu:{
	            mod:{
                globalFrom:function(from,to,distance){
                    return distance-1;
                }
                }
	        },
            shuangtiao:{
                enable:'phaseUse',
                usable:1,
                inherit:'paoxiao';
                prompt:'我知道这儿有逻辑问题‘

            },
                
            xiandan:{
                trigger:{player:'shaBegin'},
	            if((get.num(player.distance)<=1) 
                trigger.num++;
	        },
	        fenzhan:{
                trigger:{player:'damageBegin'},
                if(&&(player.hp<3))  trigger.num++;

	        },
            feiyue:{
	            audio:4,
				enable:'phaseUse',
				prompt:'出牌阶段减一滴血并指定一名角色使攻击范围为1',
				content:function(){
					"step 0"
					player.loseHp(1);
					"step 1"
					var att=get.attitude(_status.event.player,target.attack);
                    return 1;
				},
				ai:{
					basic:{
						order:1
					},
					result:{
						player:function(player){
							if(player.countCards('h')>=player.hp-1) return -1;
							if(player.hp<3) return -1;
							return 1;
						}
					}
				}
	        },
            jingzhun:{
                trigger:{player:'damageBegin'},
                if(player.distance==1)  trigger.num++;
	        },
            lieyan:{
                enable:'chooseToRespond',
                filterCard:function(card){
                return get.name(card)=='sha';
                },
                viewAs:{name:'huosha'},
                ai:{
                respondSha:true,
                }
	        },
            fantan:{
                    content:function(){
    				"step 0"
                    trigger:{target:'shaBegin'},
                    filter:function(event,player){
                    return get.name(event.card)==('leisha'||'huosha');
                    },
    				"step 1"
    				player.chooseTarget(true,'选择拼点目标',function(card,player,target){
    					return target.countCards('h')&&target!=_status.event.target1&&target!=player;
    				}).set('ai',function(target){
    					var player=_status.event.player;
    					var eff=get.effect(target,{name:'sha'},_status.event.target1,player);
    					var att=get.attitude(player,target);
    					if(att>0){
    						return eff-10;
    					}
    					return eff;
    				}).set('target1',event.target1);
    				"step 2"
    				if(result.targets.length){
    					event.target2=result.targets[0];
    					event.target1.line(event.target2);
    					event.target1.chooseToCompare(event.target2);
    				}
    				else{
    					event.finish();
    				}
    				"step 3"
                    if(!result.tie){
                        if(result.bool){
        					event.target1.useCard({name:'sha'},event.target2);
        				}
        				else{
        					event.target2.useCard({name:'sha'},event.target1);
        				}
                    }
    			}
	        },
            
            subSkill:{
                bujiqi:{
                    content:function(){
    				"step 0"
                player.maxHp--;
                player.discardPlayerCard(2);
                    "step 1"
                
                trigger:{player:'phaseBegin'},
                target.draw(1);
                if(player.hp<=2) player.hp++;
                
                }
                player.addSkill('bujiqi');    
                },
                bushao:{
                    
                player.addSkill('bujiqi');

	        },
            
            

	        
	    
	    translate:{
	        jisu:'疾速',
            jisu_info:'与所有人距离-1',
			shuangtiao:'双跳',
            shuangtiao_info:'与所有人距离-1',
			xiandan:'霰弹',
			xiandan_info:'与自己距离为1或一下的角色，受到你的杀伤害+1',
			fenzhan:'奋战',
			fenzhan_info:'生命＜3时对敌人伤害+1',
			feiyue:'飞跃',
			feiyue_info:'出牌阶段可减一滴血并指定一名角色使攻击范围为1',
			jingzhun:'精准',
			jingzhun_info:'当你与目标范围为1时，伤害+1',
			lieyan:'烈焰',
			lieyan_info:'将普通杀视为火杀，造成伤害后进行一次判定，若为红桃2到9，此角色接下来的两个回合只能抽一张牌',
			fantan:'反弹',
			fantan_info:'若你成为非普通杀的目标，你可以与伤害来源拼点，若你赢，可以将伤害转移给其他任意角色',
            scout:'侦查兵',
            scout1:'侦查兵',
            scout2:'侦查兵',
			soldier:'士兵',
			soldier1:'士兵',
			soldier2:'士兵',
			medic:'医生',
			medic1:'医生',
			medic2:'医生',
			pyro:'火焰兵',
			pyro1:'火焰兵',
			pyro2:'火焰兵',
			demoman:'榴弹手',
			demoman1:'榴弹手',
			demoman2:'榴弹手',
			heavy:'机枪手',
			heavy1:'机枪手',
			heavy2:'机枪手',
			engineer:'工程师',
			engineer1:'工程师',
			engineer2:'工程师',
			sniper:'狙击手',
			sniper1:'狙击手',
			sniper2:'狙击手',
			spy:'间谍',
			spy1:'间谍',
			spy2:'间谍',

			
	    },
	};
});
