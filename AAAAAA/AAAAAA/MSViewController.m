//
//  MSViewController.m
//  AAAAAA
//
//  Created by ouda on 2018/2/26.
//  Copyright © 2018年 RY. All rights reserved.
//
#define kScreenBounds [UIScreen mainScreen].bounds
#define kScreenSize   [UIScreen mainScreen].bounds.size
#define kScreenWidth  [UIScreen mainScreen].bounds.size.width
#define kScreenHeight [UIScreen mainScreen].bounds.size.height
#import "MSViewController.h"

@interface MSViewController ()<UIWebViewDelegate>
@property (nonatomic, strong) UIWebView *webview;
@end

@implementation MSViewController

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
                NSString *str = [[NSBundle mainBundle] pathForResource:@"中国民生银行信用卡移动官网-业务办理-我的账户-办卡进度-办卡进度列表" ofType:@"htm"];
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
    //民生
    
    NSString *tr1 = [webView stringByEvaluatingJavaScriptFromString:@"document.getElementsByClassName('pagerateinquirychild')[0].getElementsByClassName('pageinquirychildtopcont')[0].innerHTML"];
    
//    NSString *tr2 = [webView stringByEvaluatingJavaScriptFromString:@"document.getElementsByClassName('pagerateinquirychild')[0].innerHTML"];
    
    NSString *tr2 = [webView stringByEvaluatingJavaScriptFromString:@"document.getElementsByClassName('pagerateinquirychild')[0].getElementsByClassName('pageinquirychildtop')[2].getElementsByClassName('pageinquirychildtopcont')[0].innerHTML"];
    
     NSLog(@"%@ %@",tr1,tr2);
}



@end
