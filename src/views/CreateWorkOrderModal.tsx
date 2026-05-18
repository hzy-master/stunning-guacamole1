import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface CreateWorkOrderModalProps {
  onClose: () => void;
}

export default function CreateWorkOrderModal({ onClose }: CreateWorkOrderModalProps) {
  const [needAcceptance, setNeedAcceptance] = useState(true);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center pt-10">
      <div className="bg-white rounded-lg w-[850px] shadow-xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#f0f0f0]">
          <h2 className="text-[18px] font-bold text-[#333]">创建工单</h2>
          <button onClick={onClose} className="text-[#999] hover:text-[#333] transition-colors cursor-pointer">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {/* Base Info */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-[3px] h-[16px] bg-[#4281ed]"></div>
              <span className="text-[15px] font-bold text-[#4281ed]">基础信息</span>
            </div>

            <div className="flex flex-col space-y-6">
              <div className="flex items-center">
                <div className="w-[110px] text-[14px] text-[#333] shrink-0 text-left pr-4">
                  <span className="text-[#cb3131] mr-1">*</span>工单名称
                </div>
                <input 
                  type="text" 
                  placeholder="简述故障或任务内容" 
                  className="flex-1 border border-[#dcdfe6] rounded-[4px] h-[36px] px-3 text-[14px] outline-none focus:border-[#4281ed] placeholder-[#b4bccc]" 
                />
              </div>

              <div className="flex items-center">
                <div className="w-[110px] text-[14px] text-[#333] shrink-0 text-left pr-4">
                  <span className="text-[#cb3131] mr-1">*</span>具体位置
                </div>
                <input 
                  type="text" 
                  placeholder="1号教学楼" 
                  className="flex-1 border border-[#dcdfe6] rounded-[4px] h-[36px] px-3 text-[14px] outline-none focus:border-[#4281ed] placeholder-[#b4bccc]" 
                  defaultValue="1号教学楼"
                />
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center flex-1">
                  <div className="w-[110px] text-[14px] text-[#333] shrink-0 text-left pr-4">
                    <span className="text-[#cb3131] mr-1">*</span>设备类型
                  </div>
                  <select className="flex-1 border border-[#dcdfe6] rounded-[4px] h-[36px] px-3 text-[14px] outline-none focus:border-[#4281ed] bg-white text-[#333]">
                    <option value="">请选择</option>
                  </select>
                </div>
                <div className="flex items-center flex-1">
                  <div className="w-[110px] text-[14px] text-[#333] shrink-0 text-left pr-4">
                    <span className="text-[#cb3131] mr-1">*</span>紧急程度
                  </div>
                  <select className="flex-1 border border-[#dcdfe6] rounded-[4px] h-[36px] px-3 text-[14px] outline-none focus:border-[#4281ed] bg-white text-[#333]">
                    <option value="紧急">紧急</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-[110px] text-[14px] text-[#333] shrink-0 text-left pr-4 mt-2">
                  <span className="text-[#cb3131] mr-1">*</span>问题描述
                </div>
                <textarea 
                  placeholder="详细描述问题现象..." 
                  className="flex-1 border border-[#dcdfe6] rounded-[4px] h-[120px] p-3 text-[14px] outline-none focus:border-[#4281ed] placeholder-[#b4bccc] resize-none" 
                ></textarea>
              </div>

              <div className="flex items-start">
                <div className="w-[110px] text-[14px] text-[#333] shrink-0 text-left pr-4 mt-2">
                  <span className="text-[#cb3131] mr-1">*</span>故障图片
                </div>
                <div className="flex space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-[100px] h-[100px] bg-[#f4f5f7] rounded-[4px] flex items-center justify-center cursor-pointer hover:bg-[#ebedf0] transition-colors border border-transparent">
                      <Plus size={24} className="text-[#8c939d]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dispatch Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-[3px] h-[16px] bg-[#4281ed]"></div>
              <span className="text-[15px] font-bold text-[#4281ed]">派单信息</span>
            </div>

            <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center flex-1">
                  <div className="w-[110px] text-[14px] text-[#333] shrink-0 text-left pr-4">
                    <span className="text-[#cb3131] mr-1">*</span>负责人
                  </div>
                  <select className="flex-1 border border-[#dcdfe6] rounded-[4px] h-[36px] px-3 text-[14px] outline-none focus:border-[#4281ed] bg-white text-[#333]">
                    <option value="林零">林零（当前0单）</option>
                  </select>
                </div>
                <div className="flex-1"></div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center flex-1">
                  <div className="w-[110px] text-[14px] text-[#333] shrink-0 text-left pr-4 whitespace-nowrap">
                    <span className="text-[#cb3131] mr-1">*</span>需要验收
                  </div>
                  <div className="flex items-center space-x-6 h-[36px]">
                    <label className="flex items-center cursor-pointer space-x-2">
                      <input 
                        type="radio" 
                        name="needAcceptance" 
                        checked={needAcceptance} 
                        onChange={() => setNeedAcceptance(true)}
                        className="w-[16px] h-[16px] border-gray-300 text-[#4281ed] focus:ring-[#4281ed]"
                      />
                      <span className="text-[14px] text-[#333]">是</span>
                    </label>
                    <label className="flex items-center cursor-pointer space-x-2">
                      <input 
                        type="radio" 
                        name="needAcceptance" 
                        checked={!needAcceptance} 
                        onChange={() => setNeedAcceptance(false)}
                        className="w-[16px] h-[16px] border-gray-300 text-[#4281ed] focus:ring-[#4281ed]"
                      />
                      <span className="text-[14px] text-[#333]">否</span>
                    </label>
                  </div>
                </div>
                <div className="flex items-center flex-1">
                  <div className="w-[110px] text-[14px] text-[#333] shrink-0 text-left pr-4 whitespace-nowrap">
                    <span className="text-[#cb3131] mr-1">*</span>要求完成时间
                  </div>
                  <select className="flex-1 border border-[#dcdfe6] rounded-[4px] h-[36px] px-3 text-[14px] outline-none focus:border-[#4281ed] bg-white text-[#333]">
                    <option value="30分钟之内">30分钟之内</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#f0f0f0] flex justify-end space-x-4 bg-white rounded-b-lg">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-[#dcdfe6] rounded-[4px] text-[14px] text-[#606266] hover:text-[#4281ed] hover:border-[#4281ed] transition-colors bg-white cursor-pointer"
          >
            取消
          </button>
          <button className="px-6 py-2 bg-[#4281ed] text-white rounded-[4px] text-[14px] hover:bg-[#3668be] transition-colors shadow-sm cursor-pointer">
            提交工单
          </button>
        </div>
      </div>
    </div>
  );
}
