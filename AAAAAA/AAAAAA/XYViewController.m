//
//  XYViewController.m
//  AAAAAA
//
//  Created by ouda on 2018/2/26.
//  Copyright © 2018年 RY. All rights reserved.
//
#define kScreenBounds [UIScreen mainScreen].bounds
#define kScreenSize   [UIScreen mainScreen].bounds.size
#define kScreenWidth  [UIScreen mainScreen].bounds.size.width
#define kScreenHeight [UIScreen mainScreen].bounds.size.height

#import "XYViewController.h"

@interface XYViewController ()<UIWebViewDelegate>
@property (nonatomic, strong) UIWebView *webview;
@end

@implementation XYViewController

#pragma mark - 初始化
- (void)viewDidLoad {
    [super viewDidLoad];
    [self webview];
}
- (UIWebView *)webview {
    if (!_webview) {
        _webview = [[UIWebView alloc] initWithFrame:CGRectMake(0, 0, kScreenWidth, kScreenHeight)];
        _webview.delegate = self;
        [_webview loadRequest:({
            NSURLRequest *request = [NSURLRequest requestWithURL:({
                NSString *str = [[NSBundle mainBundle] pathForResource:@"兴业银行信用卡" ofType:@"htm"];
                NSURL *url = [NSURL fileURLWithPath:str];
                url;
            })];
            request;
        })];
        [self.view addSubview:_webview];
    }
    return _webview;
}

#pragma mark - UIWebViewDelegate
- (void)webViewDidFinishLoad:(UIWebView *)webView {
    // 浦发
    
    //获取tr的长度
    NSString *trLength = [webView stringByEvaluatingJavaScriptFromString:
                          @"document.getElementsByClassName('step')[0].getElementsByClassName('list2')[0].getElementsByTagName('div').length"];
    //遍历div,取出想要信息
    for (int i=1; i<[trLength integerValue]; i++) {
        NSString *str1 = [NSString stringWithFormat:@"document.getElementsByClassName('step')[0].getElementsByClassName('list2')[0].getElementsByTagName('div')[%d].length",i];
        NSString *tdLength = [webView stringByEvaluatingJavaScriptFromString:str1];
        for (int y=0; y<[tdLength integerValue]; y++) {
            NSString *str2 = [NSString stringWithFormat:@"document.getElementsByClassName('step')[0].getElementsByClassName('list2')[0].getElementsByTagName('div')[%d].innerHTML",y];
            NSString *tdContent = [webView stringByEvaluatingJavaScriptFromString:str2];
            NSLog(@"%@",tdContent);
        }
    }
    //
}

@end
