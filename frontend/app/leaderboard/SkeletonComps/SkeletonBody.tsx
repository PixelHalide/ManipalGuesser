const SkeletonBody = () => {
  return (
                  <tr className={`bg-gray-900/50 border-gray-800/50`}>
                    <td className="p-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 font-semibold">
                        <div className="p-2 rounded-full animate-pulse"></div>
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex flex-col">
                          <div className="w-32 h-4 bg-gray-700 animate-pulse rounded mb-1"></div>
                            <div className="w-24 h-4 bg-gray-700 animate-pulse rounded"></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="w-24 h-4 bg-gray-700 animate-pulse rounded mx-auto"></div>
                      </div>
                    </td>
                      <td className="p-4">
                        <div>
                          <div className="w-24 h-4 bg-gray-700 animate-pulse rounded mx-auto"></div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="w-24 h-4 bg-gray-700 animate-pulse rounded mx-auto"></div>
                        </div>
                      </td>
                  </tr>
  )
}

export default SkeletonBody
