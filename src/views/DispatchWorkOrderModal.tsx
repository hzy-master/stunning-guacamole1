import React, { useState } from 'react';
import { X } from 'lucide-react';

interface DispatchWorkOrderModalProps {
  onClose: () => void;
}

export default function DispatchWorkOrderModal({ onClose }: DispatchWorkOrderModalProps) {
  const [needAcceptance, setNeedAcceptance] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[600px] shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#f0f0f0]">
          <h2 className="text-[18px] font-bold text-[#333]">派发工单</h2>
          <button onClick={onClose} className="text-[#999] hover:text-[#333] transition-colors cursor-pointer">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 pb-2">
          {/* Info Card */}
          <div className="bg-[#f5f6f8] rounded-[6px] p-5 mb-8">
            <div className="flex flex-col space-y-4">
              <div>
                <div className="text-[14px] text-[#888] mb-1">工单名称</div>
                <div className="text-[15px] text-[#333]">5号教学楼B栋203空调不制冷</div>
              </div>
              <div>
                <div className="text-[14px] text-[#888] mb-1">问题描述</div>
                <div className="text-[15px] text-[#333]">5号教学楼B栋203空调不制冷，需要仔细排查原因。</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center flex-1">
                <div className="w-[80px] text-[14px] text-[#333] shrink-0 text-left">
                  <span className="text-[#cb3131] mr-1">*</span>紧急程度
                </div>
                <div className="flex-1 ml-4">
                  <select className="w-full border border-[#dcdfe6] rounded-[4px] h-[36px] px-3 text-[14px] outline-none focus:border-[#4281ed] bg-white text-[#333]">
                    <option value="紧急">紧急</option>
                  </select>
                </div>
              </div>
              <div className="flex-1"></div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center flex-1">
                <div className="w-[80px] text-[14px] text-[#333] shrink-0 text-left">
                  <span className="text-[#cb3131] mr-1">*</span>负责人
                </div>
                <div className="flex-1 ml-4">
                  <select className="w-full border border-[#dcdfe6] rounded-[4px] h-[36px] px-3 text-[14px] outline-none focus:border-[#4281ed] bg-white text-[#333]">
                    <option value="林零">林零（当前0单）</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center flex-1">
                <div className="w-[90px] text-[14px] text-[#333] shrink-0 text-left whitespace-nowrap">
                  <span className="text-[#cb3131] mr-1">*</span>要求完成时间
                </div>
                <div className="flex-1 ml-2">
                  <select className="w-full border border-[#dcdfe6] rounded-[4px] h-[36px] px-3 text-[14px] outline-none focus:border-[#4281ed] bg-white text-[#333]">
                    <option value="30分钟之内">30分钟之内</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-[80px] text-[14px] text-[#333] shrink-0 text-left">
                <span className="text-[#cb3131] mr-1">*</span>需要验收
              </div>
              <div className="flex items-center space-x-6 ml-4 h-[36px]">
                <label className="flex items-center cursor-pointer space-x-2">
                  <input 
                    type="radio" 
                    name="dispatchNeedAcceptance" 
                    checked={needAcceptance} 
                    onChange={() => setNeedAcceptance(true)}
                    className="w-[16px] h-[16px] border-gray-300 text-[#4281ed] focus:ring-[#4281ed]"
                  />
                  <span className="text-[14px] text-[#333]">是</span>
                </label>
                <label className="flex items-center cursor-pointer space-x-2">
                  <input 
                    type="radio" 
                    name="dispatchNeedAcceptance" 
                    checked={!needAcceptance} 
                    onChange={() => setNeedAcceptance(false)}
                    className="w-[16px] h-[16px] border-gray-300 text-[#4281ed] focus:ring-[#4281ed]"
                  />
                  <span className="text-[14px] text-[#333]">否</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 flex justify-end space-x-4 bg-white rounded-b-lg">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-[#dcdfe6] rounded-[4px] text-[14px] text-[#606266] hover:text-[#4281ed] hover:border-[#4281ed] transition-colors bg-white cursor-pointer"
          >
            取消
          </button>
          <button className="px-6 py-2 bg-[#4281ed] text-white rounded-[4px] text-[14px] hover:bg-[#3668be] transition-colors shadow-sm cursor-pointer">
            提交
          </button>
        </div>
      </div>
    </div>
  );
}
