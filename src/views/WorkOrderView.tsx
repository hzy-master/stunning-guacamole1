import React, { useState } from 'react';
import {
  FileText,
  Mail,
  User,
  CheckSquare,
  AlertTriangle,
  ChevronDown,
  Calendar,
  Clock
} from 'lucide-react';
import Pagination from '../components/Pagination';
import WorkOrderDetailModal from './WorkOrderDetailModal';
import CreateWorkOrderModal from './CreateWorkOrderModal';
import DispatchWorkOrderModal from './DispatchWorkOrderModal';
import AcceptWorkOrderModal from './AcceptWorkOrderModal';

const tableData = [
  { id: 'GD-20250801-14', name: '更换消防通道出口灯', source: '人工报修', urgency: '重要', assignee: '--', status: '待派发', time: '2025-07-21 10:00' },
  { id: 'GD-20250801-13', name: '4号教学楼A栋405照明故障', source: '巡检生成', urgency: '紧急', assignee: '李光', status: '待验收', time: '2025-07-24 08:00' },
  { id: 'GD-20250801-03', name: '1#水浸传感器越限告警', source: '系统告警', urgency: '一般', assignee: '林零', status: '待处理', time: '2025-07-24 14:00' },
  { id: 'GD-20250801-02', name: '5号教学楼B栋203空调不制冷', source: '人工报修', urgency: '重要', assignee: '周林鹏', status: '处理中', time: '2025-07-21 09:00' },
  { id: 'GD-20250801-04', name: '图书馆配电房环境存在积水', source: '巡检生成', urgency: '紧急', assignee: '林零', status: '已关闭', time: '2025-07-22 08:00' },
];

const StatusBadge = ({ status }: { status: string }) => {
  const config: Record<string, string> = {
    '待派发': 'bg-[#c1bd3c]',
    '待处理': 'bg-[#a3a3a3]',
    '处理中': 'bg-[#277cb3]',
    '待验收': 'bg-[#eaa24a]',
    '已关闭': 'bg-[#7ab743]',
  };
  return (
    <span className={`${config[status] || 'bg-gray-500'} text-white text-[12px] px-2 py-[2px] rounded inline-flex items-center justify-center font-medium min-w-[50px]`}>
      {status}
    </span>
  );
};

const UrgencyBadge = ({ urgency }: { urgency: string }) => {
  const config: Record<string, string> = {
    '重要': 'bg-[#eaa24a]',
    '紧急': 'bg-[#cb3131]',
    '一般': 'bg-[#4281ed]',
  };
  return (
    <span className={`${config[urgency] || 'bg-gray-500'} text-white text-[12px] px-2 py-[2px] rounded inline-flex items-center justify-center font-medium min-w-[40px]`}>
      {urgency}
    </span>
  );
};

const SourceText = ({ source }: { source: string }) => {
  const config: Record<string, string> = {
    '人工报修': 'text-[#7ab743]',
    '巡检生成': 'text-[#eaa24a]',
    '系统告警': 'text-[#cb3131]',
  };
  return (
    <span className={`${config[source] || 'text-[#666]'} text-[13px] font-medium`}>
      {source}
    </span>
  );
};

export default function WorkOrderView() {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  const filteredData = filterStatus 
    ? tableData.filter(item => item.status === filterStatus)
    : tableData;

  return (
    <>
      <div className="flex items-center mb-6">
        <div className="w-1.5 h-[18px] bg-[#4281ed] mr-2.5 rounded-full" />
        <h2 className="text-[16px] font-bold text-gray-800 tracking-wide">维修工单</h2>
      </div>

      <div className="grid grid-cols-6 gap-3.5 mb-8">
        <div 
          onClick={() => setFilterStatus(null)}
          className={`bg-[#8b8cf8] text-white rounded-[10px] h-[86px] flex items-center shadow-sm relative cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${filterStatus === null ? 'scale-[1.03] shadow-md' : ''}`}
        >
          <div className="absolute left-[18px] bg-black/10 p-2 rounded-lg"><FileText size={28} className="opacity-90"/></div>
          <div className="w-full flex flex-col items-center pl-4 pr-2">
              <span className="text-[15px] mb-0.5 font-medium text-white/90">今日工单总数</span>
              <span className="text-[24px] font-bold leading-none">19</span>
          </div>
        </div>
        <div 
          onClick={() => setFilterStatus('待派发')}
          className={`bg-[#c1bd3c] text-white rounded-[10px] h-[86px] flex items-center shadow-sm relative cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${filterStatus === '待派发' ? 'scale-[1.03] shadow-md' : ''}`}
        >
          <div className="absolute left-[18px] bg-black/10 p-2 rounded-lg"><Mail size={28} className="opacity-90"/></div>
          <div className="w-full flex flex-col items-center pr-2 pl-4">
              <span className="text-[15px] mb-0.5 font-medium text-white/90">待派发</span>
              <span className="text-[24px] font-bold leading-none">6</span>
          </div>
        </div>
        <div 
          onClick={() => setFilterStatus('待处理')}
          className={`bg-[#a3a3a3] text-white rounded-[10px] h-[86px] flex items-center shadow-sm relative cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${filterStatus === '待处理' ? 'scale-[1.03] shadow-md' : ''}`}
        >
          <div className="absolute left-[18px] bg-black/10 p-2 rounded-lg"><User size={28} className="opacity-90"/></div>
          <div className="w-full flex flex-col items-center pr-2 pl-4">
              <span className="text-[15px] mb-0.5 font-medium text-white/90">待处理</span>
              <span className="text-[24px] font-bold leading-none">8</span>
          </div>
        </div>
        <div 
          onClick={() => setFilterStatus('处理中')}
          className={`bg-[#277cb3] text-white rounded-[10px] h-[86px] flex items-center shadow-sm relative cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${filterStatus === '处理中' ? 'scale-[1.03] shadow-md' : ''}`}
        >
          <div className="absolute left-[18px] bg-black/10 p-2 rounded-lg"><CheckSquare size={28} className="opacity-90"/></div>
          <div className="w-full flex flex-col items-center pr-2 pl-4">
              <span className="text-[15px] mb-0.5 font-medium text-white/90">处理中</span>
              <span className="text-[24px] font-bold leading-none">3</span>
          </div>
        </div>
        <div 
          onClick={() => setFilterStatus('待验收')}
          className={`bg-[#eaa24a] text-white rounded-[10px] h-[86px] flex items-center shadow-sm relative cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${filterStatus === '待验收' ? 'scale-[1.03] shadow-md' : ''}`}
        >
          <div className="absolute left-[18px] bg-black/10 p-2 rounded-lg"><User size={28} className="opacity-90"/></div>
          <div className="w-full flex flex-col items-center pr-2 pl-4">
              <span className="text-[15px] mb-0.5 font-medium text-white/90">待验收</span>
              <span className="text-[24px] font-bold leading-none">8</span>
          </div>
        </div>
        <div 
          onClick={() => setFilterStatus('已关闭')}
          className={`bg-[#7ab743] text-white rounded-[10px] h-[86px] flex items-center shadow-sm relative cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${filterStatus === '已关闭' ? 'scale-[1.03] shadow-md' : ''}`}
        >
          <div className="absolute left-[18px] bg-black/10 p-2 rounded-lg"><Clock size={28} className="opacity-90"/></div>
          <div className="w-full flex flex-col items-center pr-2 pl-4">
              <span className="text-[15px] mb-0.5 font-medium text-white/90">已关闭</span>
              <span className="text-[24px] font-bold leading-none">2</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-5">
        <div className="flex space-x-3 items-center">
          <input 
              type="text" 
              placeholder="请输入工单编号/名称" 
              className="border border-[#e2e5e9] rounded-[4px] px-3 py-1.5 text-[13px] w-[180px] focus:outline-blue-500 placeholder-[#999] bg-white transition-shadow" 
          />
          
          <div className="relative">
            <select className="appearance-none border border-[#e2e5e9] rounded-[4px] pl-3 pr-8 py-1.5 text-[13px] w-[140px] focus:outline-blue-500 bg-white text-[#555] cursor-pointer">
              <option>请选择工单来源</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-2 text-[#999] pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none border border-[#e2e5e9] rounded-[4px] pl-3 pr-8 py-1.5 text-[13px] w-[140px] focus:outline-blue-500 bg-white text-[#555] cursor-pointer">
              <option>请选择紧急程度</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-2 text-[#999] pointer-events-none" />
          </div>
          
          <div className="relative">
            <select className="appearance-none border border-[#e2e5e9] rounded-[4px] pl-3 pr-8 py-1.5 text-[13px] w-[140px] focus:outline-blue-500 bg-white text-[#555] cursor-pointer">
              <option>请选择负责人</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-2 text-[#999] pointer-events-none" />
          </div>

          <div className="relative">
            <input 
                type="text" 
                placeholder="请选择计划执行时间/天" 
                className="border border-[#e2e5e9] rounded-[4px] pl-3 pr-8 py-1.5 text-[13px] w-[200px] focus:outline-blue-500 placeholder-[#555] bg-white cursor-pointer" 
            />
            <Calendar size={14} className="absolute right-2.5 top-2 text-[#999] pointer-events-none" />
          </div>

          <button 
            onClick={() => setFilterStatus(null)}
            className="border border-[#e2e5e9] bg-white text-[#555] px-4 py-1.5 rounded-[4px] text-[13px] hover:bg-[#f9fafb] active:scale-95 transition-all h-[32px] w-[64px] flex items-center justify-center ml-1 cursor-pointer"
          >
              重置
          </button>
          <button className="bg-[#3b7fed] text-white px-4 py-1.5 rounded-[4px] text-[13px] hover:bg-blue-600 active:scale-95 transition-all h-[32px] w-[64px] flex items-center justify-center cursor-pointer">
              查询
          </button>
        </div>
        
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-[#3b7fed] text-white px-5 py-1.5 rounded-[4px] text-[13px] hover:bg-blue-600 active:scale-95 transition-all h-[32px] flex items-center justify-center shadow-sm font-medium mr-12 cursor-pointer"
        >
          新增
        </button>
      </div>

      <div className="flex-1 w-full border border-[#f0f0f0] rounded-sm overflow-hidden mb-5">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-[#FAFCFF] text-[#333] text-[13px] font-semibold border-b border-[#f0f0f0]">
              <th className="py-3 px-4 font-semibold w-[12%]">工单编号</th>
              <th className="py-3 px-4 font-semibold w-[18%]">工单名称</th>
              <th className="py-3 px-4 font-semibold w-[10%] text-center">工单来源</th>
              <th className="py-3 px-4 font-semibold w-[10%] text-center">紧急程度</th>
              <th className="py-3 px-4 font-semibold w-[10%] text-center">负责人</th>
              <th className="py-3 px-4 font-semibold w-[10%] text-center">工单状态</th>
              <th className="py-3 px-4 font-semibold w-[15%]">创建时间</th>
              <th className="py-3 px-4 font-semibold w-[15%]">操作</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-[#444]">
            {filteredData.map((row, i) => (
              <tr key={i} className="border-b border-[#f5f5f5] hover:bg-[#fafafc] transition-colors">
                <td className="py-3.5 px-4">{row.id}</td>
                <td className="py-3.5 px-4">{row.name}</td>
                <td className="py-3.5 px-4 text-center">
                  <SourceText source={row.source} />
                </td>
                <td className="py-3.5 px-4 text-center">
                  <UrgencyBadge urgency={row.urgency} />
                </td>
                <td className="py-3.5 px-4 text-center">{row.assignee}</td>
                <td className="py-3.5 px-4 text-center">
                  <StatusBadge status={row.status} />
                </td>
                <td className="py-3.5 px-4">{row.time}</td>
                <td className="py-3.5 px-4 flex items-center space-x-2 select-none h-full mt-0.5">
                  <button 
                    onClick={() => setSelectedOrder(row)}
                    className="border border-[#e5e7eb] text-gray-600 px-[14px] py-1 rounded shadow-sm hover:bg-gray-50 focus:outline-none active:scale-95 transition-all bg-white cursor-pointer"
                  >
                    查看
                  </button>
                  {row.status === '待派发' && (
                    <button 
                      onClick={() => setShowDispatchModal(true)}
                      className="border border-[#e5e7eb] text-gray-600 px-[14px] py-1 rounded shadow-sm hover:bg-gray-50 focus:outline-none active:scale-95 transition-all bg-white cursor-pointer"
                    >
                      派发
                    </button>
                  )}
                  {row.status === '待验收' && (
                    <button 
                      onClick={() => setShowAcceptModal(true)}
                      className="border border-[#e5e7eb] text-gray-600 px-[14px] py-1 rounded shadow-sm hover:bg-gray-50 focus:outline-none active:scale-95 transition-all bg-white cursor-pointer"
                    >
                      验收
                    </button>
                  )}
                  {row.status === '待派发' && (
                    <button className="border border-[#e5e7eb] text-gray-600 px-[14px] py-1 rounded shadow-sm hover:bg-gray-50 focus:outline-none active:scale-95 transition-all bg-white cursor-pointer">
                      删除
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />

      {selectedOrder && (
        <WorkOrderDetailModal 
          workOrder={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
          onDispatch={() => {
            setSelectedOrder(null);
            setShowDispatchModal(true);
          }}
          onAccept={() => {
            setSelectedOrder(null);
            setShowAcceptModal(true);
          }}
        />
      )}

      {showCreateModal && (
        <CreateWorkOrderModal onClose={() => setShowCreateModal(false)} />
      )}

      {showDispatchModal && (
        <DispatchWorkOrderModal onClose={() => setShowDispatchModal(false)} />
      )}

      {showAcceptModal && (
        <AcceptWorkOrderModal onClose={() => setShowAcceptModal(false)} />
      )}
    </>
  );
}
