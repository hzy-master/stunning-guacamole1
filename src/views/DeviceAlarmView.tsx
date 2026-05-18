import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import Pagination from '../components/Pagination';
import DeviceAlarmModal from './DeviceAlarmModal';

const alarmData = [
  { id: 1, name: '新能源一二排与北...', type: '开关', region: '长江产业大厦20楼...', alarmType: '通信故障', category: '--', content: '设备离线', status: '持续中', time: '2026-03-10 13:30:52', duration: '31天1小时2分钟', showClear: false, showTransfer: false },
  { id: 2, name: '总电表', type: '智能表', region: '长江产业大厦20楼...', alarmType: '能耗告警', category: '重要告警', content: '日用电量 (40.37k...', status: '持续中', time: '2026-03-10 13:30:52', duration: '31天1小时2分钟', showClear: true, showTransfer: true },
  { id: 3, name: '总电表', type: '智能表', region: '长江产业大厦20楼...', alarmType: '能耗告警', category: '重要告警', content: '日用电量 (40.37k...', status: '持续中', time: '2026-03-10 13:30:52', duration: '31天1小时2分钟', showClear: true, showTransfer: true },
  { id: 4, name: '总水表', type: '智能水表', region: '长江产业大厦20楼...', alarmType: '能耗告警', category: '紧急告警', content: '日用水量 (0.09m³...', status: '持续中', time: '2026-03-10 13:30:52', duration: '31天1小时2分钟', showClear: true, showTransfer: true },
  { id: 5, name: '水浸', type: '水浸', region: '长江产业大厦20楼...', alarmType: '越限告警', category: '一般告警', content: '水浸状态 (未检测...', status: '持续中', time: '2026-03-10 13:30:52', duration: '31天1小时2分钟', showClear: false, showTransfer: false },
  { id: 6, name: 'PIR&温湿度传感器', type: '温湿度', region: '长江产业大厦20楼...', alarmType: '越限告警', category: '预警', content: '温度 (20.30℃) 低...', status: '持续中', time: '2026-03-10 13:30:52', duration: '31天1小时2分钟', showClear: true, showTransfer: true },
  { id: 7, name: 'PIR&温湿度传感器', type: '温湿度', region: '长江产业大厦20楼...', alarmType: '越限告警', category: '预警', content: '湿度 (41.50%) 低...', status: '持续中', time: '2026-03-10 13:30:52', duration: '31天1小时2分钟', showClear: false, showTransfer: false },
  { id: 8, name: '烟雾传感器', type: '烟感', region: '长江产业大厦20楼...', alarmType: '越限告警', category: '预警', content: '烟感浓度 (2.76%...', status: '持续中', time: '2026-03-10 13:30:52', duration: '31天1小时2分钟', showClear: true, showTransfer: true },
  { id: 9, name: '烟雾传感器', type: '烟感', region: '长江产业大厦20楼...', alarmType: '越限告警', category: '一般告警', content: '烟感浓度 (1.83%...', status: '已消除', time: '2026-03-10 13:30:52', duration: '31天1小时2分钟', showClear: false, showTransfer: false },
  { id: 10, name: '进线总表', type: '智能表', region: '长江产业大厦20楼...', alarmType: '能耗告警', category: '重要告警', content: '日用电量 (27.55k...', status: '已消除', time: '2026-03-10 13:30:52', duration: '31天1小时2分钟', showClear: false, showTransfer: false },
];

const DeviceTypeBadge = ({ type }: { type: string }) => {
  return (
    <span className="bg-[#4a8aed] text-white text-[12px] px-2 py-0.5 rounded inline-flex items-center justify-center whitespace-nowrap">
      {type}
    </span>
  );
};

const AlarmTypeBadge = ({ type }: { type: string }) => {
  const config: Record<string, string> = {
    '通信故障': 'bg-[#e59441]',
    '能耗告警': 'bg-[#c6604a]',
    '越限告警': 'bg-[#e59441]',
  };
  return (
    <span className={`${config[type] || 'bg-gray-500'} text-white text-[12px] px-2 py-0.5 rounded inline-flex items-center justify-center whitespace-nowrap`}>
      {type}
    </span>
  );
};

export default function DeviceAlarmView() {
  const [selectedAlarm, setSelectedAlarm] = useState<typeof alarmData[0] | null>(null);

  return (
    <>
      <div className="flex items-center mb-5">
        <h2 className="text-[16px] font-bold text-gray-800 tracking-wide">设备告警</h2>
      </div>

      <div className="flex flex-col space-y-3 mb-5">
        <div className="flex space-x-3 items-center">
          <div className="relative">
            <select className="appearance-none border border-[#e2e5e9] rounded-[4px] pl-3 pr-8 py-1.5 text-[13px] w-[200px] focus:outline-blue-500 bg-white text-[#555] cursor-pointer">
              <option>请选择所属区域</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-2 text-[#999] pointer-events-none" />
          </div>
          
          <div className="relative">
            <select className="appearance-none border border-[#e2e5e9] rounded-[4px] pl-3 pr-8 py-1.5 text-[13px] w-[180px] focus:outline-blue-500 bg-white text-[#555] cursor-pointer">
              <option>请选择设备类型</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-2 text-[#999] pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none border border-[#e2e5e9] rounded-[4px] pl-3 pr-8 py-1.5 text-[13px] w-[180px] focus:outline-blue-500 bg-white text-[#555] cursor-pointer">
              <option>请选择告警等级</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-2 text-[#999] pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none border border-[#e2e5e9] rounded-[4px] pl-3 pr-8 py-1.5 text-[13px] w-[180px] focus:outline-blue-500 bg-white text-[#555] cursor-pointer">
              <option>请选择告警类型</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-2 text-[#999] pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none border border-[#e2e5e9] rounded-[4px] pl-3 pr-8 py-1.5 text-[13px] w-[180px] focus:outline-blue-500 bg-white text-[#555] cursor-pointer">
              <option>请选择告警状态</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-2 text-[#999] pointer-events-none" />
          </div>
        </div>

        <div className="flex space-x-3 items-center">
            <input 
                type="text" 
                placeholder="请输入设备名称" 
                className="border border-[#e2e5e9] rounded-[4px] px-3 py-1.5 text-[13px] w-[200px] focus:outline-blue-500 placeholder-[#999] bg-white transition-shadow" 
            />
            
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="请选择告警时间" 
                    className="border border-[#e2e5e9] rounded-[4px] pl-9 pr-3 py-1.5 text-[13px] w-[260px] focus:outline-blue-500 placeholder-[#555] bg-white cursor-pointer" 
                />
                <Calendar size={14} className="absolute left-3 top-2 text-[#999] pointer-events-none" />
            </div>

            <button className="border border-[#e2e5e9] bg-white text-[#555] px-4 py-1.5 rounded-[4px] text-[13px] hover:bg-[#f9fafb] active:scale-95 transition-all h-[32px] w-[64px] flex items-center justify-center ml-1 cursor-pointer">
                重置
            </button>
            <button className="bg-[#3b7fed] text-white px-4 py-1.5 rounded-[4px] text-[13px] hover:bg-blue-600 active:scale-95 transition-all h-[32px] w-[64px] flex items-center justify-center cursor-pointer">
                查询
            </button>
        </div>
      </div>

      <div className="flex-1 w-full border border-[#f0f0f0] rounded-sm overflow-x-auto mb-5">
        <table className="w-full text-left border-collapse min-w-max">
          <thead>
            <tr className="bg-[#FAFCFF] text-[#333] text-[13px] font-semibold border-b border-[#f0f0f0]">
              <th className="py-3 px-3 font-semibold whitespace-nowrap">序号</th>
              <th className="py-3 px-3 font-semibold whitespace-nowrap">设备名称</th>
              <th className="py-3 px-3 font-semibold whitespace-nowrap">设备类型</th>
              <th className="py-3 px-3 font-semibold whitespace-nowrap">所属区域</th>
              <th className="py-3 px-3 font-semibold text-center whitespace-nowrap">告警类型</th>
              <th className="py-3 px-3 font-semibold text-center whitespace-nowrap">告警等级</th>
              <th className="py-3 px-3 font-semibold whitespace-nowrap">告警内容</th>
              <th className="py-3 px-3 font-semibold text-center whitespace-nowrap">告警状态</th>
              <th className="py-3 px-3 font-semibold whitespace-nowrap">告警时间</th>
              <th className="py-3 px-3 font-semibold whitespace-nowrap">持续时长</th>
              <th className="py-3 px-3 font-semibold whitespace-nowrap min-w-[200px]">操作</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-[#444]">
            {alarmData.map((row, i) => (
              <tr key={i} className="border-b border-[#f5f5f5] hover:bg-[#fafafc] transition-colors">
                <td className="py-3.5 px-3 whitespace-nowrap">{row.id}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">{row.name}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <DeviceTypeBadge type={row.type} />
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap">{row.region}</td>
                <td className="py-3.5 px-3 text-center whitespace-nowrap">
                  <AlarmTypeBadge type={row.alarmType} />
                </td>
                <td className="py-3.5 px-3 text-center whitespace-nowrap">{row.category}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">{row.content}</td>
                <td className="py-3.5 px-3 text-center font-medium whitespace-nowrap">
                  {row.status === '持续中' ? (
                    <span className="text-[#cb3131] bg-[#fdf0f0] px-2 py-0.5 rounded-[3px] border border-[#f8d0d0] whitespace-nowrap">{row.status}</span>
                  ) : (
                    <span className="text-[#7ab743] bg-[#f3faf0] px-2 py-0.5 rounded-[3px] border border-[#dff3d0] whitespace-nowrap">{row.status}</span>
                  )}
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap">{row.time}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">{row.duration}</td>
                <td className="py-3.5 px-3 flex items-center space-x-2 select-none h-full mt-0.5 whitespace-nowrap">
                  <button 
                    onClick={() => setSelectedAlarm(row)}
                    className="border border-[#e5e7eb] text-gray-600 px-[10px] py-1 rounded shadow-sm hover:bg-gray-50 focus:outline-none active:scale-95 transition-all bg-white cursor-pointer"
                  >
                    查看
                  </button>
                  {row.showClear && (
                    <button className="border border-[#e5e7eb] text-gray-600 px-[10px] py-1 rounded shadow-sm hover:bg-gray-50 focus:outline-none active:scale-95 transition-all bg-white cursor-pointer">
                      消除
                    </button>
                  )}
                  {row.showTransfer && (
                    <button className="border border-[#e5e7eb] text-gray-600 px-[10px] py-1 rounded shadow-sm hover:bg-gray-50 focus:outline-none active:scale-95 transition-all bg-white cursor-pointer">
                      转工单
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />
      
      {selectedAlarm && (
        <DeviceAlarmModal alarm={selectedAlarm} onClose={() => setSelectedAlarm(null)} />
      )}
    </>
  );
}
