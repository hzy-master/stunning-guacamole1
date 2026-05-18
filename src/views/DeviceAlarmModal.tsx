import React from 'react';
import { X, Copy } from 'lucide-react';

interface Alarm {
  id: number;
  name: string;
  type: string;
  region: string;
  alarmType: string;
  category: string;
  content: string;
  status: string;
  time: string;
  duration: string;
  showClear: boolean;
  showTransfer: boolean;
}

interface DeviceAlarmModalProps {
  alarm: Alarm;
  onClose: () => void;
}

export default function DeviceAlarmModal({ alarm, onClose }: DeviceAlarmModalProps) {
  // Determine scenario based on alarm
  const isOngoing = alarm.status === '持续中';
  const isCleared = alarm.status === '已消除';
  const isImportant = alarm.category === '重要告警' || alarm.category === '紧急告警';
  const isGeneral = alarm.category === '一般告警' || alarm.category === '预警';
  
  const showActionButtons = isOngoing && alarm.showClear && alarm.showTransfer;
  const isScenario1 = isOngoing && !showActionButtons; // Image 1
  const isScenario2 = showActionButtons; // Image 2
  const isScenario3 = isCleared && isGeneral; // Image 3
  const isScenario4 = isCleared && isImportant; // Image 4

  const AlarmTypeBadge = ({ type }: { type: string }) => {
    const config: Record<string, string> = {
      '通信故障': 'bg-[#e59441]',
      '能耗告警': 'bg-[#c6604a]',
      '越限告警': 'bg-[#e59441]',
    };
    return (
      <span className={`${config[type] || 'bg-[#e59441]'} text-white text-[12px] px-2 py-0.5 rounded-[4px] inline-flex items-center justify-center`}>
        {type}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] animate-in fade-in duration-200">
      <div className="bg-white rounded-[8px] w-[800px] h-[680px] max-h-[90vh] flex flex-col shadow-xl relative overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#d9d9d9] shrink-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-[18px] font-bold text-[#333]">告警详情</h2>
            {isOngoing ? (
              <span className="text-[#db4949] bg-[#fdeeee] px-2 py-0.5 text-[12px] rounded-[3px]">持续中</span>
            ) : (
              <span className="text-[#52c41a] bg-[#e6f7ec] px-2 py-0.5 text-[12px] rounded-[3px]">已消除</span>
            )}
          </div>
          <button onClick={onClose} className="text-[#666] hover:text-[#333] transition-colors cursor-pointer p-1 rounded-full hover:bg-gray-100">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex p-6 pb-20 overflow-y-auto custom-scrollbar flex-1">
          <div className="flex-1 pr-10">
            <h3 className="text-[16px] font-bold text-[#333] mb-4">基本信息</h3>
            
            <div className="bg-[#f5f8fc] border border-[#d9e1e9] rounded-[8px] p-6 space-y-6">
              <div className="flex items-start">
                <span className="text-[#666] text-[14px] w-[80px] shrink-0">设备名称：</span>
                <span className="text-[#333] text-[14px] font-bold">{alarm.name}</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#666] text-[14px] w-[80px] shrink-0">设备类型：</span>
                <span className="text-[#333] text-[14px]">{alarm.type}</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#666] text-[14px] w-[80px] shrink-0">告警等级：</span>
                <span className="text-[#333] text-[14px]">{alarm.category === '--' ? '一般告警' : alarm.category}</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#666] text-[14px] w-[80px] shrink-0">所属区域：</span>
                <span className="text-[#333] text-[14px]">长江产业大厦20楼大会议室</span>
              </div>
              <div className="flex items-start mt-4">
                <span className="text-[#666] text-[14px] w-[80px] shrink-0 leading-6">告警类型：</span>
                <span className="flex-1"><AlarmTypeBadge type={alarm.alarmType} /></span>
              </div>
              <div className="flex items-start mt-4">
                <span className="text-[#666] text-[14px] w-[80px] shrink-0">告警内容：</span>
                <span className="text-[#333] text-[14px]">设备离线</span>
              </div>
              
              {(isScenario3) && (
                <div className="flex items-start mt-4">
                  <span className="text-[#666] text-[14px] w-[80px] shrink-0">消除原因：</span>
                  <span className="text-[#333] text-[14px]">通信恢复</span>
                </div>
              )}
              
              {(isScenario4 || (isCleared && !isScenario3)) && (
                <div className="flex items-start mt-4">
                  <span className="text-[#666] text-[14px] w-[80px] shrink-0">修复记录：</span>
                  <span className="text-[#333] text-[14px]">维修工单已处理，设备通信恢复</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-[0.8] pl-2">
            <h3 className="text-[16px] font-bold text-[#333] mb-6">告警处理时间线</h3>
            
            <div className="relative pl-0 mt-4 ml-1">
              <div className="absolute left-[3px] top-[14px] bottom-0 w-[1.5px] bg-[#d9d9d9] z-0"></div>
              
              {/* Step 1: 告警触发 */}
              <div className="relative z-10 w-full group">
                 <div className="flex items-center">
                    <div className="w-[8px] h-[8px] rounded-full bg-[#db4949] z-10 relative"></div>
                    <div className="ml-4 flex items-center text-[14px]">
                       <span className="text-[#333] mr-2">2026-03-08 16:41:31</span>
                       <span className="text-[#d9d9d9] mx-1">|</span>
                       <span className="text-[#db4949] ml-1">告警触发</span>
                    </div>
                 </div>
                 <div className="ml-[28px] mt-2 mb-8 text-[14px] text-[#333]">
                   设备离线
                 </div>
              </div>

              {/* Step 2: 已转工单 (Scenario 1 & 4) */}
              {(isScenario1 || isScenario4) && (
                <div className="relative z-10 w-full">
                   <div className="flex items-center">
                      <div className="w-[8px] h-[8px] rounded-full bg-[#3b7fed] z-10 relative"></div>
                      <div className="ml-4 flex items-center text-[14px]">
                         <span className="text-[#333] mr-2">2026-03-08 16:41:31</span>
                         <span className="text-[#d9d9d9] mx-1">|</span>
                         <span className="text-[#3b7fed] ml-1">已转工单</span>
                      </div>
                   </div>
                   <div className="ml-[28px] mt-2 space-y-3 mb-8 text-[14px] text-[#333]">
                     <div>操作人：林零</div>
                     <div className="flex items-center text-[#333]">
                       工单编号：<span className="text-[#3b7fed] ml-1">GD-20250801-01</span>
                       <button className="text-[#3b7fed] ml-2 cursor-pointer hover:text-blue-500 transition-colors p-0.5 rounded focus:outline-none">
                         <Copy size={16} />
                       </button>
                     </div>
                   </div>
                </div>
              )}

              {/* Step 3/2: 告警已消除 (Scenario 3 & 4) */}
              {isCleared && (
                 <div className="relative z-10 mb-0 w-full pb-2">
                    <div className="flex items-center">
                       <div className="w-[8px] h-[8px] rounded-full bg-[#52c41a] z-10 box-border relative"></div>
                       <div className="ml-4 flex items-center text-[14px]">
                          <span className="text-[#333] mr-2">2026-03-08 16:49:31</span>
                          <span className="text-[#d9d9d9] mx-1">|</span>
                          <span className="text-[#52c41a] ml-1">告警已消除</span>
                       </div>
                    </div>
                    <div className="ml-[28px] mt-2 text-[14px] text-[#333]">
                      {(isScenario4 || (isCleared && !isScenario3)) ? '负责人：李光' : '操作人：林零'}
                    </div>
                    {/* Hide the remaining line segment below the last dot */}
                    <div className="absolute left-[-2px] bottom-0 top-[8px] w-[20px] bg-white z-0"></div>
                 </div>
              )}
              
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        {showActionButtons && (
           <div className="flex justify-end px-6 py-4 pb-6 shrink-0 bg-white">
              <div className="flex space-x-3">
                 <button className="px-6 py-1.5 border border-[#d9d9d9] text-[#333] text-[14px] rounded-[4px] bg-white hover:border-[#3b7fed] hover:text-[#3b7fed] transition-all cursor-pointer">
                    消除
                 </button>
                 <button className="px-6 py-1.5 bg-[#3b7fed] text-white text-[14px] rounded-[4px] hover:bg-blue-600 transition-all cursor-pointer">
                    转工单
                 </button>
              </div>
           </div>
        )}
      </div>
    </div>
  );
}
